const axios = require('axios');
const TRENDYOL_CONSTANTS = require('../constants/trendyol');
const { formatProductForTrendyol, formatUpdateDataForTrendyol } = require('../utils/trendyolHelpers');

class TrendyolService {
  constructor() {
    this.apiUrl = TRENDYOL_CONSTANTS.API_URL;
    this.supplierId = process.env.TRENDYOL_SUPPLIER_ID;
    this.apiKey = process.env.TRENDYOL_API_KEY;
    this.apiSecret = process.env.TRENDYOL_API_SECRET;
  }

  async createProduct(productData) {
    try {
      const trendyolProduct = formatProductForTrendyol(productData);
      return await this.makeRequest('POST', '/v2/products', trendyolProduct);
    } catch (error) {
      console.error('Trendyol ürün oluşturma hatası:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const trendyolProduct = formatUpdateDataForTrendyol(productData);
      return await this.makeRequest('PUT', '/v2/products', trendyolProduct);
    } catch (error) {
      console.error('Trendyol ürün güncelleme hatası:', error);
      throw error;
    }
  }

  async deleteProduct(barcode) {
    try {
      return await this.makeRequest('DELETE', `/v2/products/${barcode}`);
    } catch (error) {
      console.error('Trendyol ürün silme hatası:', error);
      throw error;
    }
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      const response = await axios({
        method,
        url: `${this.apiUrl}/${this.supplierId}${endpoint}`,
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        ...(data && { data })
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  getAuthHeader() {
    return `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`;
  }
}

module.exports = new TrendyolService(); 