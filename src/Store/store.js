// store.js
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  searchTerm: '',
};

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  try {
    const response = await fetch(`http://localhost:3500/delete-product/${productId}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      // Handle successful deletion here if needed
      // You may want to update the state.products array accordingly
    });
  },
});

export const { setProducts, setSearchTerm } = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;
