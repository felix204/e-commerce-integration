const trendyolService = require('../services/trendyolService');

class TrendyolController {
  async createProduct(productData) {
    try {
      const result = await trendyolService.createProduct(productData);
      return result;
    } catch (error) {
      console.error('Trendyol controller - createProduct hatası:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const result = await trendyolService.updateProduct(productId, productData);
      return result;
    } catch (error) {
      console.error('Trendyol controller - updateProduct hatası:', error);
      throw error;
    }
  }

  async deleteProduct(barcode) {
    try {
      const result = await trendyolService.deleteProduct(barcode);
      return result;
    } catch (error) {
      console.error('Trendyol controller - deleteProduct hatası:', error);
      throw error;
    }
  }
}

module.exports = new TrendyolController(); 