import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    },
});

export default store;