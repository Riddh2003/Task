import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectService } from '../../services/api';

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (search = '', { rejectWithValue }) => {
    try {
      const response = await projectService.getAllProjects(search);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectService.createProject(projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create project');
    }
  }
);

// Initial state
const initialState = {
  projects: [],
  total: 0,
  loading: false,
  error: null,
};

// Slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.total = action.payload.total;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create project
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.data);
        state.total += 1;
      });
  },
});

export default projectSlice.reducer;