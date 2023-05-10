import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

export default store;