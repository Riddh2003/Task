// src/components/Navbar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">Dashboard</div>
            <div className="flex items-center gap-4">
                {user && <span className="hidden sm:inline">Hi, {user.name}</span>}
                <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
