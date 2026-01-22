const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE (Must be before routes)
app.use(cors({
  origin: ["https://sentinel-vault-lihdp8bj2-utkarshkumar1802s-projects.vercel.app", "http://localhost:5173"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"]
}));
app.use(express.json()); 

// 2. ROUTES
app.use('/api/auth', require('./routes/auth.js'));

// 3. DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
const path = require('path');

// Add this after your other middleware (app.use(express.json()))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add this with your other routes
const vaultRoutes = require('./routes/vault.js');
app.use('/api/vault', vaultRoutes);