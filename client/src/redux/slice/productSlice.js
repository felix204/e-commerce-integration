import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchProductsApi, 
  createProductApi, 
  updateProductApi, 
  deleteProductApi 
} from '@/api';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => await fetchProductsApi()
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (productData) => await createProductApi(productData)
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }) => await updateProductApi(id, productData)
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    await deleteProductApi(id);
    return id; // Silinen ürünün ID'sini döndür
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export default productSlice.reducer;
