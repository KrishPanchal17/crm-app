import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log('productSlice: Fetching products from API');
      const response = await axios.get('https://dummyjson.com/products?limit=5');
      const existingProducts = getState().products.products;
      const newProducts = response.data.products;
      // Merge: Keep existing products not in API response
      const mergedProducts = [
        ...existingProducts.filter(ep => !newProducts.some(np => np.id === ep.id)),
        ...newProducts,
      ];
      return mergedProducts;
    } catch (err) {
      console.error('productSlice: Failed to fetch products', err);
      return rejectWithValue(err.message);
    }
  }
);

const initialProducts = JSON.parse(localStorage.getItem('products')) || [];

const productSlice = createSlice({
  name: 'products',
  initialState: { products: initialProducts, status: 'idle', error: null },
  reducers: {
    setProducts: (state, action) => {
      console.log('productSlice: Setting products', action.payload);
      state.products = action.payload;
      state.status = 'succeeded';
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    addProduct: (state, action) => {
      console.log('productSlice: Adding product', action.payload);
      state.products.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    updateProduct: (state, action) => {
      console.log('productSlice: Updating product', action.payload);
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    deleteProduct: (state, action) => {
      console.log('productSlice: Deleting product', action.payload);
      state.products = state.products.filter(p => p.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    setStatus: (state, action) => {
      console.log('productSlice: Setting status', action.payload);
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        localStorage.setItem('products', JSON.stringify(state.products));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;