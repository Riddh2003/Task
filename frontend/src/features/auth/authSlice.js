import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
    try {
        const res = await axios.post('localhost:3000/api/auth/login', formData);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;