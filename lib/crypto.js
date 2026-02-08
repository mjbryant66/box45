// HMAC-based magic link token generation and verification
import { createHmac, randomBytes } from 'crypto';

const SECRET = process.env.MAGIC_LINK_SECRET;

export function generateMagicToken(email) {
  if (!SECRET) throw new Error('MAGIC_LINK_SECRET not configured');

  const normalized = email.toLowerCase().trim();
  const nonce = randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const payload = `${normalized}:${nonce}:${timestamp}`;
  const signature = createHmac('sha256', SECRET).update(payload).digest('hex');

  // Token format: base64(payload):signature
  const encoded = Buffer.from(payload).toString('base64url');
  return `${encoded}.${signature}`;
}

export function verifyMagicToken(token) {
  if (!SECRET) throw new Error('MAGIC_LINK_SECRET not configured');

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const payload = Buffer.from(encoded, 'base64url').toString();
  const expectedSig = createHmac('sha256', SECRET).update(payload).digest('hex');

  // Constant-time comparison
  if (signature.length !== expectedSig.length) return null;
  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  if (mismatch !== 0) return null;

  const [email] = payload.split(':');
  return { email };
}
