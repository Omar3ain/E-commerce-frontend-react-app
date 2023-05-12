import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from './wishlistService';


const initialState = {
    wishlistItems: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            console.log(token);
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

export const getWishlist = createAsyncThunk(
    "wishlist/getwishlist",
    async (thunkAPI) => {
        try {
            
        } catch (error) {
            
        }
    }
)

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,

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
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            });
    },

})

export default wishlistSlice.reducer;