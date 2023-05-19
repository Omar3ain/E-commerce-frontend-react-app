import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  products: [],
  count: 0,
  next: null,
  previous: null,
  product: {},
  isLoading: true,
  isError: false,
  isSuccess: false,
}

export const getProducts = createAsyncThunk('products/getProducts',
  async ({ categoryId, search }, thunkAPI) => {
    let config = {};
    let url = '';
    if (thunkAPI.getState().auth.user !== null) {
      const token = thunkAPI.getState().auth.user.token;
      config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
    }

    if (categoryId) url = `http://localhost:8000/products/${categoryId}/get/?search=${search}`
    else url = `http://localhost:8000/products/?search=${search}`
    try {
      const resp = await axios(url, config);
      return resp.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const getNextPage = createAsyncThunk(
  'products/getNextPage',
  async (nextPageUrl, thunkAPI) => {
    try {
      const resp = await axios.get(nextPageUrl);
      return resp.data;
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
export const getPrevPage = createAsyncThunk(
  'products/getPrevPage',
  async (prevPageUrl, thunkAPI) => {
    try {
      const resp = await axios.get(prevPageUrl);
      return resp.data;
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

export const getProductById = createAsyncThunk('products/getProductDetails',
  async (productId, thunkAPI) => {

    let config = {};
    let url = `http://localhost:8000/products/${productId}`;

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
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getNextPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNextPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(getNextPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getPrevPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrevPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(getPrevPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },

})


export default productSlice.reducer;