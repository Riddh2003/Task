// src/features/auth/LoginPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(formData)); // Changed from loginUser to login
        if (result.meta.requestStatus === 'fulfilled') navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};
