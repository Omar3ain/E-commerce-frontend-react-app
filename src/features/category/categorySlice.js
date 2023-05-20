import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../baseUrl';

const url = `${API_BASE_URL}categories/`;

const initialState = {
  categories: [],
  page: 1,
  isLoading: true,
  isError: false,
}

export const getCategories = createAsyncThunk('categories/getCategoryItem',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },

})


export default categorySlice.reducer;