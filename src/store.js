import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { authReducer } from './reducers/userReducers';

const reducer = combineReducers({
    auth: authReducer,
});

let initialState = {};

const middleware = [thunk];

const store = configureStore({
    reducer,
    initialState
});

export default store;
