const API_BASE_URL = 'http://localhost:5000/api';

// Ürünleri getir
export const fetchProductsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Ürünler getirilemedi');
    return response.json();
  } catch (error) {
    console.error('Ürünleri getirme hatası:', error);
    throw error;
  }
};

// Yeni ürün ekle
export const createProductApi = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Ürün eklenemedi');
    return response.json();
  } catch (error) {
    console.error('Ürün ekleme hatası:', error);
    throw error;
  }
};

// Ürün güncelle
export const updateProductApi = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Ürün güncellenemedi');
    return response.json();
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    throw error;
  }
};

// Ürün sil
export const deleteProductApi = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Ürün silinemedi');
    return response.json();
  } catch (error) {
    console.error('Ürün silme hatası:', error);
    throw error;
  }
};
