const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe utilise les centimes
      currency: currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/payment-success', (req, res) => {
  // Logique pour gérer le succès du paiement
  res.send('Paiement réussi');
});

router.get('/payment-cancel', (req, res) => {
  // Logique pour gérer l'annulation du paiement
  res.send('Paiement annulé');
});

module.exports = router;
