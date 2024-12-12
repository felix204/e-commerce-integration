const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// MongoDB bağlantısı
connectDB()
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => {
    console.error('❌ MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
app.use('/api', productRoutes);

// Error handler
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server başarıyla başlatıldı - http://localhost:${PORT}`);
  console.log('-----------------------------------');
  console.log('API endpoints:');
  console.log(`GET  http://localhost:${PORT}/api/test - Test endpoint`);
  console.log(`POST http://localhost:${PORT}/api/products - Ürün ekle`);
}); 