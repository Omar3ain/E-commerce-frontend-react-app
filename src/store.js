import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import cartReducer from "./features/cart/cartSlice";
import CategorySlice from "./features/category/categorySlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        category: CategorySlice
    },
});

export default store;