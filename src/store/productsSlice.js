import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProducts from '../api/productAPI';

const initialState = {
  products: [],
  status: 'idle'
}

export const getProductsData = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();

    return response.data;
  }
);


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload
      });
  }
});

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;