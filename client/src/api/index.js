import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5000/api';

// Redux Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Ürünler getirilemedi');
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Ürün eklenemedi');
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Ürün güncellenemedi');
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Ürün silinemedi');
    return id;
  }
);
