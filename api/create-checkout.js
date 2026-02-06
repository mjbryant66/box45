// Vercel Serverless Function - Create Stripe Checkout Session
import Stripe from 'stripe';

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
    const { code, employerName } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: `T4 Box 45 Compliance Memorandum - Code ${code}`,
              description: employerName
                ? `Audit record for ${employerName}`
                : 'Professional compliance memorandum with timestamp and legal basis',
              images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'],
            },
            unit_amount: 900, // $9.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || `https://${process.env.VERCEL_URL}`}?session_id={CHECKOUT_SESSION_ID}&payment=success`,
      cancel_url: `${req.headers.origin || `https://${process.env.VERCEL_URL}`}?payment=cancelled`,
      metadata: {
        code: code.toString(),
        employerName: employerName || 'Not provided',
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
