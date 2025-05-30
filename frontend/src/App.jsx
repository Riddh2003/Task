import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/LoginPage';
import { Dashboard } from './features/projects/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
