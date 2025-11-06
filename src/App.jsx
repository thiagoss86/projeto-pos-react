import { Route, Routes, Navigate } from 'react-router-dom'
import MoviesPage from './pages/MoviesPage';
import TmdbPage from './pages/TmdbPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext'
import { MoviesProvider } from './contexts/MoviesContext';
import  NavBar  from './components/NavBar';
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <div className='container'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<MoviesProvider><MoviesPage /></MoviesProvider>} />
          <Route path="/tmdb" element={<MoviesProvider><TmdbPage /></MoviesProvider>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin"
            element={
              <ProtectedRoute>
                <div className='card'>Área administrativa</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className='card'>404 - Página não encontrada</div>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}