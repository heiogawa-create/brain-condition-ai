import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = Boolean(secretKey);

export function getStripe() {
  if (!secretKey) {
    return null;
  }
  return new Stripe(secretKey);
}
