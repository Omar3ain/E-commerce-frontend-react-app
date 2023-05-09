import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import authReducer from './features/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;