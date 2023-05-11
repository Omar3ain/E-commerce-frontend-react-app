import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8000/categories';

const initialState = {
    categories:[],
    page:1,
    isLoading:true,
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
          });
      },

})


export default categorySlice.reducer;