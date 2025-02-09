const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { createProduct } = require('../services/shopifyService');

// Tüm ürünleri getir
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni ürün ekle
router.post('/products', async (req, res) => {
  try {
    console.log('Gelen ürün verisi:', req.body); // Debug için

    // Önce MongoDB'ye ekle
    const mongoProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    });
    
    await mongoProduct.save();
    console.log('MongoDB\'ye eklendi:', mongoProduct); // Debug için

    // Sonra Shopify'a ekle
    const shopifyProduct = await createProduct(req.body);
    console.log('Shopify\'a eklendi:', shopifyProduct); // Debug için

    // MongoDB'deki ürünü Shopify ID ile güncelle
    mongoProduct.shopifyId = shopifyProduct.id;
    await mongoProduct.save();

    res.status(201).json({
      success: true,
      mongoProduct,
      shopifyProduct
    });
  } catch (error) {
    console.error('Ürün ekleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ürün silme endpoint'i
router.delete('/products/:id', async (req, res) => {
  try {
    // MongoDB'den ürünü bul
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }

    // Önce Shopify'dan sil
    if (product.shopifyId) {
      await shopify.product.delete(product.shopifyId);
    }

    // Sonra MongoDB'den sil
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (error) {
    console.error('Ürün silme hatası:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ürün güncelleme endpoint'i
router.put('/products/:id', async (req, res) => {
  try {
    // MongoDB'den ürünü bul
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }

    // Shopify'da güncelle
    if (product.shopifyId) {
      await shopify.product.update(product.shopifyId, {
        title: req.body.title,
        body_html: req.body.description,
        variants: [
          {
            price: req.body.price,
            inventory_quantity: req.body.quantity || 1
          }
        ]
      });
    }

    // MongoDB'de güncelle
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      },
      { new: true }
    );

    res.json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 