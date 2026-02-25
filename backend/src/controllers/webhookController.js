import Stripe from 'stripe';
import db from '../config/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint per ricevere webhook da Stripe
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig);
  } catch (err) {
    console.log('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gestisci gli eventi webhook
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('💳 Payment succeeded:', paymentIntent.id);

      // Aggiorna lo stato del pagamento a completed
      try {
        await db.query(
          'UPDATE payments SET status = $1, confirmed_at = CURRENT_TIMESTAMP WHERE stripe_payment_id = $2',
          ['completed', paymentIntent.id],
        );

        // Aggiorna lo stato dell'ordine a confirmed
        if (paymentIntent.metadata?.order_id) {
          await db.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2', [
            'confirmed',
            paymentIntent.metadata.order_id,
          ]);
        }

        console.log('✅ Payment completed and order confirmed');
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }
      break;
    }

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed:', event.data.object.id);
      // Potrebbe inviare notifica all'utente
      break;

    case 'payment_intent.canceled':
      console.log('🚫 Payment canceled:', event.data.object.id);
      break;

    default:
      console.log('🔍 Unhandled event type:', event.type);
  }

  // Restituisci una risposta a Stripe
  res.json({ received: true });
};
