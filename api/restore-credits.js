// API: Restore wallet access via magic link token
// GET /api/restore-credits?token=xxx
// Returns: { success, email, credits } or { success: false, error }

import { consumeMagicLink } from '../lib/kv.js';
import { verifyMagicToken } from '../lib/crypto.js';
import { getWallet } from '../lib/kv.js';

export const config = {
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.query?.token;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Verify HMAC signature
    const verified = verifyMagicToken(token);
    if (!verified) {
      return res.status(401).json({ success: false, error: 'Invalid or tampered token' });
    }

    // Consume from Redis (one-time use)
    const linkData = await consumeMagicLink(token);
    if (!linkData) {
      return res.status(410).json({ success: false, error: 'Link expired or already used' });
    }

    // Get current wallet
    const wallet = await getWallet(linkData.email);

    return res.status(200).json({
      success: true,
      email: linkData.email,
      credits: wallet?.credits || 0,
    });
  } catch (error) {
    console.error('Restore credits error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
