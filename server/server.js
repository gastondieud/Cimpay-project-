require('dotenv').config();
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes'); // Importez le fichier de routes principal

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('Could not connect to MongoDB Atlas');
  console.error('Error details:', err.message);
  console.error('Full error object:', JSON.stringify(err, null, 2));
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Cimpay. Utilisez /api pour accéder aux endpoints.' });
});

app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



  

