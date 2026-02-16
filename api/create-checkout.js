// Vercel Serverless Function - Create Stripe Checkout Session
// Supports credit pack purchases: single ($9/1cr), ten ($29/10cr), twentyfive ($59/25cr)
import Stripe from 'stripe';
import { CREDIT_PACKS } from '../lib/kv.js';

export const config = {
  maxDuration: 10,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  httpClient: Stripe.createFetchHttpClient(),
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packId, email } = req.body;

    // Validate pack
    const pack = CREDIT_PACKS[packId];
    if (!pack) {
      return res.status(400).json({
        error: 'Invalid pack. Use: single, ten, or twentyfive',
      });
    }

    const origin = req.headers.origin || `https://${process.env.VERCEL_URL}`;

    // Create checkout session for credit pack
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: `Box45 ${pack.stripeName}`,
              description: `${pack.credits} PDF download credit${pack.credits > 1 ? 's' : ''} for T4 Box 45 Compliance Memorandums`,
            },
            unit_amount: pack.priceCAD,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?session_id={CHECKOUT_SESSION_ID}&payment=success&amt=${(pack.priceCAD / 100).toFixed(2)}`,
      cancel_url: `${origin}?payment=cancelled`,
      metadata: {
        packId,
        credits: pack.credits.toString(),
        email: email || '',
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
