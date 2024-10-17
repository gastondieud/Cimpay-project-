require('dotenv').config();
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const initializeCounters = require('./utils/initCounters');

const routes = require('./routes'); // Importez le fichier de routes principal
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());  // Pour parser le raw JSON
app.use(express.urlencoded({ extended: true }));  // Pour parser form-data et x-www-form-urlencoded
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:3001' // Ajustez si votre frontend est sur un port différent
}));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return initializeCounters();
  })
  .then(() => {
    console.log('Counters initialized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error starting server:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Cimpay. Utilisez /api pour accéder aux endpoints.' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.use('/api', routes);
app.use('/api/auth', authRoutes);
console.log('Auth routes registered');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(400).json({ error: 'Invalid JSON in request body' });
});

app.use((req, res, next) => {
  console.log('Received body:', req.body);
  next();
});






