import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { createAdminClient, isSupabaseAdminConfigured } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  if (!isStripeConfigured || !isSupabaseAdminConfigured) {
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();
  const supabase = createAdminClient();

  if (!webhookSecret || !stripe || !supabase) {
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id ?? session.client_reference_id;
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
      const subscriptionId =
        typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

      if (userId && customerId && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await upsertSubscription(supabase, {
          userId,
          customerId,
          subscriptionId,
          status: subscription.status,
          currentPeriodEnd: subscription.items.data[0]?.current_period_end,
        });
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.user_id;
      const customerId =
        typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;

      if (userId) {
        await upsertSubscription(supabase, {
          userId,
          customerId,
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.items.data[0]?.current_period_end,
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  params: {
    userId: string;
    customerId: string;
    subscriptionId: string;
    status: string;
    currentPeriodEnd?: number;
  }
) {
  await supabase.from('subscriptions').upsert(
    {
      user_id: params.userId,
      stripe_customer_id: params.customerId,
      stripe_subscription_id: params.subscriptionId,
      status: params.status,
      current_period_end: params.currentPeriodEnd
        ? new Date(params.currentPeriodEnd * 1000).toISOString()
        : null,
    },
    { onConflict: 'user_id' }
  );
}
