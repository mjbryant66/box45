// Vercel KV (Upstash Redis) - Wallet Operations
// Data model:
//   wallet:{email}       → { email, credits, purchaseHistory[], createdAt, updatedAt }
//   magiclink:{token}    → { email, expiresAt }  (24h TTL)
//   idempotent:{sessionId} → { processed: true } (7d TTL)

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Credit pack definitions
export const CREDIT_PACKS = {
  single: { credits: 1, priceCAD: 900, label: '1 Credit', stripeName: '1 Credit Pack' },
  ten: { credits: 10, priceCAD: 2900, label: '10 Credits', stripeName: '10 Credit Pack' },
  twentyfive: { credits: 25, priceCAD: 5900, label: '25 Credits', stripeName: '25 Credit Pack' },
};

// --- Wallet Operations ---

export async function getWallet(email) {
  const key = `wallet:${email.toLowerCase().trim()}`;
  const wallet = await redis.get(key);
  return wallet || null;
}

export async function createWallet(email) {
  const normalized = email.toLowerCase().trim();
  const key = `wallet:${normalized}`;
  const wallet = {
    email: normalized,
    credits: 0,
    purchaseHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await redis.set(key, wallet);
  return wallet;
}

export async function addCredits(email, credits, stripeSessionId) {
  const normalized = email.toLowerCase().trim();
  const key = `wallet:${normalized}`;
  let wallet = await redis.get(key);

  if (!wallet) {
    wallet = {
      email: normalized,
      credits: 0,
      purchaseHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  wallet.credits += credits;
  wallet.purchaseHistory.push({
    credits,
    stripeSessionId,
    timestamp: new Date().toISOString(),
  });
  wallet.updatedAt = new Date().toISOString();

  await redis.set(key, wallet);
  return wallet;
}

export async function deductCredit(email) {
  const normalized = email.toLowerCase().trim();
  const key = `wallet:${normalized}`;
  const wallet = await redis.get(key);

  if (!wallet || wallet.credits < 1) {
    return { success: false, credits: wallet?.credits || 0 };
  }

  wallet.credits -= 1;
  wallet.updatedAt = new Date().toISOString();
  await redis.set(key, wallet);

  return { success: true, credits: wallet.credits };
}

// --- Idempotency ---

export async function checkIdempotency(sessionId) {
  const key = `idempotent:${sessionId}`;
  const exists = await redis.get(key);
  return !!exists;
}

export async function markProcessed(sessionId) {
  const key = `idempotent:${sessionId}`;
  // 7 day TTL
  await redis.set(key, { processed: true }, { ex: 7 * 24 * 60 * 60 });
}

// --- Magic Link Tokens ---

export async function storeMagicLink(token, email) {
  const key = `magiclink:${token}`;
  // 24 hour TTL
  await redis.set(key, { email: email.toLowerCase().trim(), createdAt: new Date().toISOString() }, { ex: 24 * 60 * 60 });
}

export async function consumeMagicLink(token) {
  const key = `magiclink:${token}`;
  const data = await redis.get(key);
  if (!data) return null;
  // One-time use: delete after consuming
  await redis.del(key);
  return data;
}

export { redis };
