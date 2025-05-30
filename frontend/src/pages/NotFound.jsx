import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
            <p className="text-lg mb-6">Oops! Page not found.</p>
            <Link
                to="/dashboard"
                className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
                Go to Dashboard
            </Link>
        </div>
    );
}
