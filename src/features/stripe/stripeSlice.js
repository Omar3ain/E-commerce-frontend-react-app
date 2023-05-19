import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stripeService from './stripeService';

const initialState = {
    clientSecret: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const checkout = createAsyncThunk(
    "stripe/checkout",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await stripeService.checkout(orderId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const continuePayment = createAsyncThunk(
    "stripe/continuePayment",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await stripeService.continuePayment(orderId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(checkout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.clientSecret = action.payload.clientSecret;
            })
            .addCase(checkout.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(continuePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(continuePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.clientSecret = action.payload.clientSecret;
            })
            .addCase(continuePayment.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

    },
});

export const { reset } = stripeSlice.actions;
export default stripeSlice.reducer;