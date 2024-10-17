require('dotenv').config();
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

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
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

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
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Use this URL to connect: http://localhost:${PORT}`);
});






