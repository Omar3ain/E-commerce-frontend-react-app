import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const url = '   ';

const initialState = {
    cartItems: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
    sub_total: 0,
    total_amount: 0,
};


