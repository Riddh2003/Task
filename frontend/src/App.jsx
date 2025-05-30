import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/LoginPage';
import { Dashboard } from './features/projects/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    
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
  );
}
