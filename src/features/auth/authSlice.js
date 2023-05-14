import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isRegisterSuccess: false,
    isLoading: false,
    message: "",
};

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error.response.data.non_field_errors[0] || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk("/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("/logout", async () => {
    await authService.logout();
});

export const updateUserInfo = createAsyncThunk("/updateUserInfo", async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const id = thunkAPI.getState().auth.user.id;
        return await authService.updateUserInfo(user, token, id);
    } catch (error) {
        let message = "";
        const data = error.response.data;
        if (Object.keys(data).length > 0) {
            for (const field in data) {
              const errorMessages = data[field];
              for (const errorMessage of errorMessages) {
                message += `${errorMessage}`;
              }
            }
        }
        else {
            message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
        }
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isRegisterSuccess = true;
                // state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                // state.user = null;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;