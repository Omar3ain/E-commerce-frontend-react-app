import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';
import { toast } from 'react-toastify';

const initialState = {
    order:{},
    orderItems: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
    message: "",
};


const orderSlice = createSlice({
    name: 'order',
    initialState,
    // extraReducers: (builder) => {
    //     builder
            
    // },


})


export default orderSlice.reducer;