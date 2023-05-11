import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8000/products';

const initialState = {
    products:[],
    page:1,
    isLoading:true,
}

export const getProducts = createAsyncThunk('products/getProductItem',
async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    
    extraReducers: (builder) => {
        builder
          .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
          })
          .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
          });
      },

})


export default productSlice.reducer;