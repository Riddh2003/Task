import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold hover:text-blue-200">Dashboard</Link>
        <div className="flex space-x-4">
          <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
