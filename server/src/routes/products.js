const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const shopifyController = require('../controllers/shopifyController');
const trendyolController = require('../controllers/trendyolController');

// Tüm ürünleri getir
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ürün ekleme
router.post('/products', async (req, res) => {
  try {
    // MongoDB'ye ekle
    const product = new Product(req.body);
    await product.save();

    // Shopify'a ekle
    try {
      const shopifyProduct = await shopifyController.createProduct(req.body);
      product.shopifyId = shopifyProduct.id;
      await product.save();
    } catch (shopifyError) {
      console.error('Shopify hatası:', shopifyError);
    }

    // Trendyol'a ekle
    try {
      const trendyolProduct = await trendyolController.createProduct(req.body);
      product.trendyolBarcode = trendyolProduct.items[0].barcode;
      await product.save();
    } catch (trendyolError) {
      console.error('Trendyol hatası:', trendyolError);
    }

    res.status(201).json(product);
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

// Ürün güncelleme
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }

    // Shopify'da güncelle
    if (product.shopifyId) {
      try {
        await shopifyController.updateProduct(product.shopifyId, req.body);
      } catch (shopifyError) {
        console.error('Shopify güncelleme hatası:', shopifyError);
      }
    }

    // Trendyol'da güncelle
    if (product.trendyolBarcode) {
      try {
        await trendyolController.updateProduct(product.trendyolBarcode, {
          ...req.body,
          barcode: product.trendyolBarcode
        });
      } catch (trendyolError) {
        console.error('Trendyol güncelleme hatası:', trendyolError);
      }
    }

    // MongoDB'de güncelle
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 