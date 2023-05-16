import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import cartReducer from "./features/cart/cartSlice";
import CategorySlice from "./features/category/categorySlice"
import wishlistReducer from "./features/wishlist/wishlistSlice";
import stripeReducer from "./features/stripe/stripeSlice";
import orderReducer from "./features/order/orderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        category: CategorySlice,
        wishlist: wishlistReducer,
        stripe: stripeReducer,
        order: orderReducer
    },
});

export default store;