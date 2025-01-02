const TRENDYOL_CONSTANTS = require('../constants/trendyol');

const formatProductForTrendyol = (productData) => {
  return {
    items: [{
      barcode: productData.barcode || Date.now().toString(),
      title: productData.title,
      productMainId: `PROD_${Date.now()}`,
      brandId: process.env.TRENDYOL_BRAND_ID,
      categoryId: process.env.TRENDYOL_CATEGORY_ID,
      quantity: productData.quantity || 1,
      stockCode: `STK_${Date.now()}`,
      dimensionalWeight: TRENDYOL_CONSTANTS.DEFAULT_WEIGHT,
      description: productData.description,
      currencyType: TRENDYOL_CONSTANTS.CURRENCY_TYPE,
      listPrice: productData.price,
      salePrice: productData.price,
      vatRate: TRENDYOL_CONSTANTS.VAT_RATE,
      cargoCompanyId: TRENDYOL_CONSTANTS.DEFAULT_CARGO_COMPANY_ID,
      images: [
        {
          url: productData.images?.[0] || TRENDYOL_CONSTANTS.DEFAULT_PLACEHOLDER_IMAGE
        }
      ],
    }]
  };
};

const formatUpdateDataForTrendyol = (productData) => {
  return {
    items: [{
      barcode: productData.barcode,
      title: productData.title,
      description: productData.description,
      listPrice: productData.price,
      salePrice: productData.price,
      quantity: productData.quantity || 1
    }]
  };
};

module.exports = {
  formatProductForTrendyol,
  formatUpdateDataForTrendyol
}; 