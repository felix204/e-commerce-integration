const shopifyService = require('../services/shopifyService');

class ShopifyController {
  async createProduct(productData) {
    try {
      const result = await shopifyService.createProduct(productData);
      return result;
    } catch (error) {
      console.error('Shopify controller - createProduct hatası:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const result = await shopifyService.updateProduct(productId, productData);
      return result;
    } catch (error) {
      console.error('Shopify controller - updateProduct hatası:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await shopifyService.deleteProduct(productId);
      return result;
    } catch (error) {
      console.error('Shopify controller - deleteProduct hatası:', error);
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      const result = await shopifyService.getProduct(productId);
      return result;
    } catch (error) {
      console.error('Shopify controller - getProduct hatası:', error);
      throw error;
    }
  }
}

module.exports = new ShopifyController(); 