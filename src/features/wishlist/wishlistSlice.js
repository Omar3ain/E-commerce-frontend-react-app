import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from './wishlistService';
import { toast } from 'react-toastify';

const initialState = {
    wishlistItems: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
    message: "",
};

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await wishlistService.addToWishlist(productId, token);
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

export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeWishlist",
    async (productId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await wishlistService.removeWishlist(productId, token);
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

export const getWishlist = createAsyncThunk(
    "wishlist/getwishlist",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await wishlistService.getWishlist(token);
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
)

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlistItems = [...state.wishlistItems, action.payload];
                toast.success("added to wishlist")
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                toast.error("couldn't add item")
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                const index = state.wishlistItems.findIndex(
                    (item) => item.product.id === action.payload.product.id && item.user_id === action.payload.user_id
                );
                state.wishlistItems.splice(index, 1);
                toast.success("removed from wishlist")
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                console.log(action);
                toast.error('couldn\'t remove from wishlist')
            })
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlistItems = action.payload.wishlist;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })
    },


})

export const { reset } = wishlistSlice.actions;

export default wishlistSlice.reducer;