import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

export const { reducer, actions } = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItemIndex = state.basket.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.basket[existingItemIndex].quantity += 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      state.basket = state.basket.filter(item => item.id !== action.payload.id);
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.basket.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.basket = state.basket.filter(item => item.id !== action.payload.id);
        } else {
          existingItem.quantity -= 1;
        }
      }
    }
  },
});
