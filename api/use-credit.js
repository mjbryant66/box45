// API: Deduct 1 credit from wallet for PDF download
// POST /api/use-credit { email }
// Returns: { success, credits } or { success: false, error }

import { deductCredit, getWallet } from '../lib/kv.js';

export const config = {
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const result = await deductCredit(email);

    if (!result.success) {
      return res.status(402).json({
        success: false,
        credits: result.credits,
        error: 'Insufficient credits',
      });
    }

    return res.status(200).json({
      success: true,
      credits: result.credits,
    });
  } catch (error) {
    console.error('Use credit error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
