const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const creditRoutes = require('./routes/creditRoutes');
app.use('/api/credits', creditRoutes);
// Test route
app.get('/', (req, res) => {
  res.send('Ghar Ki Dukaan Backend is Running! 🏠');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((error) => console.log('❌ MongoDB Connection Failed:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});