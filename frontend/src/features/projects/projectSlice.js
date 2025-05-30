import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk('projects/fetch', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axios.get('/api/project/getallprojects', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
    }
});

const projectSlice = createSlice({
    name: 'projects',
    initialState: { items: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => { state.loading = true; })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default projectSlice.reducer;