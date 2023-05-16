import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  products: [],
  product:{},
  page: 1,
  isLoading: true,
}

export const getProducts = createAsyncThunk('products/getProductItem',
async (categoryId, thunkAPI) => {

  let config={};
  let url = '';
  if (thunkAPI.getState().auth.user !== null) {
      const token = thunkAPI.getState().auth.user.token;
      config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
    }

    if(categoryId) url= `http://localhost:8000/products/${categoryId}/get`;
    else  url = 'http://localhost:8000/products';
    try {
      const resp = await axios(url, config);
      return resp.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const getProductById = createAsyncThunk('products/getProductDetails',
async (productId, thunkAPI) => {

  let config={};
  let url= `http://localhost:8000/products/${productId}`;
  
  if (thunkAPI.getState().auth.user !== null) {
      const token = thunkAPI.getState().auth.user.token;
      config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
    }

    try {
      const resp = await axios(url, config);
      return resp.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
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
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
      });
  },

})


export default productSlice.reducer;