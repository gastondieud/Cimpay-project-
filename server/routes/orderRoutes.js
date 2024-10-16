const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Créer une nouvelle commande
router.post('/', auth, async (req, res) => {
  const order = new Order({
    userId: req.user._id,
    products: req.body.products,
    totalPrice: req.body.totalPrice,
    status: 'pending'
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Obtenir toutes les commandes d'un utilisateur
router.get('/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Obtenir une commande spécifique
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Commande non trouvée');
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Non autorisé');
    }
    res.json(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Mettre à jour le statut d'une commande
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Commande non trouvée');
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
