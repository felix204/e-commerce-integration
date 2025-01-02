const SHOPIFY_CONSTANTS = require('../constants/shopify');

const formatProductForShopify = (productData) => {
  return {
    title: productData.title,
    body_html: productData.description,
    vendor: SHOPIFY_CONSTANTS.DEFAULT_VENDOR,
    product_type: SHOPIFY_CONSTANTS.DEFAULT_PRODUCT_TYPE,
    status: 'active',
    variants: [{
      price: productData.price.toString(),
      inventory_quantity: productData.quantity || 1,
      inventory_management: SHOPIFY_CONSTANTS.INVENTORY_MANAGEMENT,
      inventory_policy: SHOPIFY_CONSTANTS.INVENTORY_POLICY,
      fulfillment_service: SHOPIFY_CONSTANTS.FULFILLMENT_SERVICE,
      requires_shipping: SHOPIFY_CONSTANTS.REQUIRES_SHIPPING,
      taxable: SHOPIFY_CONSTANTS.TAXABLE
    }],
    images: productData.images ? productData.images.map(url => ({ src: url })) : []
  };
};

const formatUpdateDataForShopify = (productData) => {
  return {
    title: productData.title,
    body_html: productData.description,
    variants: [{
      price: productData.price.toString(),
      inventory_quantity: productData.quantity || 1
    }]
  };
};

module.exports = {
  formatProductForShopify,
  formatUpdateDataForShopify
}; 