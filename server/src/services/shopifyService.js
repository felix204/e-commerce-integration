const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const createProduct = async (productData) => {
  try {
    const product = await shopify.product.create({
      title: productData.title,
      body_html: productData.description,
      vendor: 'Your Store',
      variants: [
        {
          price: productData.price,
          inventory_quantity: productData.quantity || 1,
          inventory_management: 'shopify'
        }
      ]
    });
    return product;
  } catch (error) {
    console.error('Shopify ürün ekleme hatası:', error);
    throw error;
  }
};

const updateProduct = async (shopifyId, productData) => {
  try {
    const product = await shopify.product.update(shopifyId, {
      title: productData.title,
      body_html: productData.description,
      variants: [
        {
          price: productData.price,
          inventory_quantity: productData.quantity || 1
        }
      ]
    });
    return product;
  } catch (error) {
    console.error('Shopify ürün güncelleme hatası:', error);
    throw error;
  }
};

const deleteProduct = async (shopifyId) => {
  try {
    await shopify.product.delete(shopifyId);
    return true;
  } catch (error) {
    console.error('Shopify ürün silme hatası:', error);
    throw error;
  }
};

module.exports = { 
  createProduct,
  updateProduct,
  deleteProduct
}; 