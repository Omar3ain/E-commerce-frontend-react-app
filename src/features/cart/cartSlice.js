import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';


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
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
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
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
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
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
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
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
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
            })
            .addCase(getCart.rejected, (state, action) => {
                state.message = action.payload.error;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.cartItems = [];
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
                state.message = action.payload.error;
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
                state.message = action.payload.error;
            })

    },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;