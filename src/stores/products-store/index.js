// İlk sayfa

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "details/fetchProducts",
  async () => {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=%27%27&key=AIzaSyCi29Xz-ra5E1jLFNYIZRPPM01oJj740LQ"
      );
    const products = await response.json();
    return products;
  }
);

export const { reducer, actions } = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.items || []; 
    });
  },
});
