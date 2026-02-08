// API: Get wallet balance by email
// GET /api/wallet?email=user@example.com
// POST /api/wallet { email }

import { getWallet } from '../lib/kv.js';

export const config = {
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let email;

    if (req.method === 'GET') {
      email = req.query?.email;
    } else if (req.method === 'POST') {
      email = req.body?.email;
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const wallet = await getWallet(email);

    if (!wallet) {
      return res.status(200).json({ credits: 0, found: false });
    }

    return res.status(200).json({
      credits: wallet.credits,
      email: wallet.email,
      found: true,
    });
  } catch (error) {
    console.error('Wallet API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
