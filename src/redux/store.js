import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer, { fetchProducts } from './productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

// Dispatch fetchProducts only if no products in localStorage
const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
if (savedProducts.length === 0) {
  console.log('store: Dispatching fetchProducts');
  store.dispatch(fetchProducts());
}

export default store;