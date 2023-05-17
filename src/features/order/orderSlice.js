import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';
import { toast } from 'react-toastify';

const initialState = {
    order: {},
    orderItems: [],
    userOrders: [],
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

export const getOrders = createAsyncThunk(
    "order/get",
    async (_,thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getOrders(token);
        } catch (error) {
            console.log(error);
            const message =
            error.response.data.error ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
        }
    }
)
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
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.order = {}
                state.orderItems = []
                toast.error(state.message)
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.userOrders.findIndex(
                    (item) => item.id === action.payload.orderId 
                );
                state.userOrders.splice(index, 1);
                toast.success("order deleted successfully")
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                toast.error('couldn\'t delete order')
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userOrders = action.payload.order;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.userOrders =[]
                toast.error(state.message)
            })
    },


})


export default orderSlice.reducer;