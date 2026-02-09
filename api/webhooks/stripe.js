// Stripe Webhook Handler - checkout.session.completed
// Adds credits to wallet, sends confirmation email with magic link
import Stripe from 'stripe';
import { addCredits, checkIdempotency, markProcessed, storeMagicLink, CREDIT_PACKS } from '../../lib/kv.js';
import { generateMagicToken } from '../../lib/crypto.js';
import { sendPurchaseConfirmationEmail } from '../../lib/email.js';

// Disable Vercel body parser — Stripe needs raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 30,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  httpClient: Stripe.createFetchHttpClient(),
});

// Read raw body from request stream
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Map Stripe amount (cents CAD) to credit pack
function creditsFromAmount(amountTotal) {
  for (const pack of Object.values(CREDIT_PACKS)) {
    if (pack.priceCAD === amountTotal) return pack.credits;
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Only handle checkout.session.completed
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: true });
  }

  const session = event.data.object;

  try {
    // --- Idempotency: prevent duplicate credits on webhook retry ---
    const alreadyProcessed = await checkIdempotency(session.id);
    if (alreadyProcessed) {
      console.log(`Idempotency: session ${session.id} already processed`);
      return res.status(200).json({ received: true, duplicate: true });
    }

    // --- Extract data ---
    const email = session.customer_details?.email || session.metadata?.email;
    if (!email) {
      console.error('No email found in session:', session.id);
      return res.status(400).json({ error: 'No customer email' });
    }

    const packId = session.metadata?.packId;
    let credits;

    if (packId && CREDIT_PACKS[packId]) {
      credits = CREDIT_PACKS[packId].credits;
    } else {
      // Fallback: infer from amount
      credits = creditsFromAmount(session.amount_total);
    }

    if (!credits) {
      console.error('Could not determine credits for session:', session.id, 'amount:', session.amount_total);
      return res.status(400).json({ error: 'Unknown credit pack amount' });
    }

    // --- Add credits to wallet ---
    const wallet = await addCredits(email, credits, session.id);
    console.log(`Added ${credits} credits to ${email}. New balance: ${wallet.credits}`);

    // --- Mark processed BEFORE email (idempotency) ---
    // Must happen before email send so Stripe retries on email failure
    // don't duplicate credits
    await markProcessed(session.id);

    // --- Generate magic link and send confirmation email ---
    try {
      const token = generateMagicToken(email);
      await storeMagicLink(token, email);
      await sendPurchaseConfirmationEmail(email, credits, token);
      console.log(`Confirmation email sent to ${email}`);
    } catch (emailError) {
      // Email failure is non-fatal — credits already granted and session marked processed
      console.error(`Email send failed for ${email}:`, emailError.message);
    }

    return res.status(200).json({ received: true, credits, email });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 500 so Stripe retries
    return res.status(500).json({ error: 'Processing failed' });
  }
}
