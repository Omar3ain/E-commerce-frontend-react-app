import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';
import { toast } from 'react-toastify';

const initialState = {
    order: {},
    orderItems: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
    message: "",
};


export const placeOrder = createAsyncThunk(
    "order/add",
    async (address, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.placeOrder(address, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const deleteOrder = createAsyncThunk(
    "order/delete",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.deleteOrder(orderId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order = action.payload.order;
                state.orderItems = action.payload.order_items;
                toast.success("order placed successfully")

            })
            .addCase(placeOrder.rejected, (state, action) => {
                console.log(action);
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.cart = {}
                state.cartItems = []
                toast.error(state.message)
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                //when we get all user orders -> remove this order
                toast.success("order deleted successfully")
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                console.log(action);
                toast.error('couldn\'t delete order')
            })
    },


})


export default orderSlice.reducer;