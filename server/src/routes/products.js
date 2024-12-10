const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { createProduct } = require('../services/shopifyService');

// Tüm ürünleri getir
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni ürün ekle
router.post('/products', async (req, res) => {
  try {
    // Önce Shopify'a ekle
    const shopifyProduct = await createProduct(req.body);
    
    // Sonra MongoDB'ye ekle
    const product = new Product({
      ...req.body,
      shopifyId: shopifyProduct.id
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 