import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import cartReducer from "./features/cart/cartSlice";
import CategorySlice from "./features/category/categorySlice"
import wishlistReducer from "./features/wishlist/wishlistSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        category: CategorySlice,
        wishlist: wishlistReducer
    },
});

export default store;