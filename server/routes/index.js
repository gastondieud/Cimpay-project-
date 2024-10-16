const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/auth', authRoutes);
router.use('/payments', paymentRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
