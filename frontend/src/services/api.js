import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Project services
export const projectService = {
  getAllProjects: (search = '') => api.get(`/project/getallprojects?search=${search}`),
  createProject: (projectData) => api.post('/project/createproject', projectData),
  updateProject: (id, projectData) => api.put(`/project/${id}`, projectData),
  deleteProject: (id) => api.delete(`/project/${id}`),
};

export default api;