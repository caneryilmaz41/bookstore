import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "./user-store";
import { reducer as productsReducer } from "./products-store";
import{reducer as basketReducer}from"./basket-store"
export const store=configureStore({
    reducer:{
        user:userReducer,
        products:productsReducer,
        basket:basketReducer
    }
})