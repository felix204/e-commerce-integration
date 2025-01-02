const Shopify = require('shopify-api-node');
const SHOPIFY_CONSTANTS = require('../constants/shopify');
const { formatProductForShopify, formatUpdateDataForShopify } = require('../utils/shopifyHelpers');

class ShopifyService {
  constructor() {
    this.shopify = new Shopify({
      shopName: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: SHOPIFY_CONSTANTS.API_VERSION
    });
  }

  async createProduct(productData) {
    try {
      const shopifyProduct = formatProductForShopify(productData);
      const result = await this.shopify.product.create(shopifyProduct);
      return result;
    } catch (error) {
      console.error('Shopify ürün oluşturma hatası:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      // Önce mevcut ürünü al
      const existingProduct = await this.shopify.product.get(productId);
      const variantId = existingProduct.variants[0].id;

      // Ürün bilgilerini güncelle
      const updateData = formatUpdateDataForShopify(productData);
      const updatedProduct = await this.shopify.product.update(productId, updateData);

      // Varyant bilgilerini güncelle
      await this.shopify.productVariant.update(variantId, {
        price: productData.price.toString(),
        inventory_quantity: productData.quantity || 1
      });

      return updatedProduct;
    } catch (error) {
      console.error('Shopify ürün güncelleme hatası:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await this.shopify.product.delete(productId);
      return { success: true };
    } catch (error) {
      console.error('Shopify ürün silme hatası:', error);
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      return await this.shopify.product.get(productId);
    } catch (error) {
      console.error('Shopify ürün getirme hatası:', error);
      throw error;
    }
  }
}

module.exports = new ShopifyService(); 