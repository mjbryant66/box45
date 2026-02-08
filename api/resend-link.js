// API: Resend magic link email to access credits on new device
// POST /api/resend-link { email }
// Returns: { success } or { success: false, error }

import { getWallet, storeMagicLink } from '../lib/kv.js';
import { generateMagicToken } from '../lib/crypto.js';
import { sendMagicLinkEmail } from '../lib/email.js';

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

    // Verify wallet exists
    const wallet = await getWallet(email);
    if (!wallet) {
      // Don't reveal whether email exists — return success either way
      // This prevents email enumeration attacks
      return res.status(200).json({ success: true });
    }

    // Generate new magic link
    const token = generateMagicToken(email);
    await storeMagicLink(token, email);
    await sendMagicLinkEmail(email, token);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend link error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
