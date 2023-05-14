import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
    sub_total: 0,
    total_amount: 0,
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.addToCart(productId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await cartService.getCart(token);
    } catch (error) {
        const message =
            error.response.data.error ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async (cartItemId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.decreaseQuantity(cartItemId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const increaseQuantity = createAsyncThunk(
    "cart/icreaseQuantity",
    async (cartItemId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.increaseQuantity(cartItemId, token);
        } catch (error) {
            const message =
                error.response.data.error ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
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
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartItems = [...state.cartItems, action.payload];
                toast.success("Product added successfully");
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartItems = action.payload.Cart;
                toast.success("Cart retrieved successfully");
            })
            .addCase(getCart.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.cartItems = [];
                toast.error(state.message);
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.id) {
                    state.cartItems = state.cartItems.filter(
                        (cartItem) => cartItem.id !== action.payload.id
                    );
                }
                else if (action.payload.item) {
                    const index = state.cartItems.findIndex(
                        (item) => item.id === action.payload.item.id
                    );
                    if (index !== -1) {
                        state.cartItems[index].quantity = action.payload.item.quantity;
                    }
                }
            })
            .addCase(decreaseQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(state.message);
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.cartItems.findIndex(
                    (item) => item.id === action.payload.item.id
                );
                if (index !== -1) {
                    state.cartItems[index].quantity = action.payload.item.quantity;
                }
            })
            .addCase(increaseQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(state.message);
            })

    },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;