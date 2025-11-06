import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import MoviesPage from './pages/MoviesPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext'
import { MoviesProvider } from './contexts/MoviesContext';
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <div className='container'>
        <nav className='header'>
          <h1>Catálogo de Filmes</h1>
          <div className='header-actions'>
            <NavLink className="link" to="/movies">🎬 Filmes</NavLink>
            <NavLink className="link" to="/github">🐙 GitHub</NavLink>
            <NavLink className="link" to="/admin">🔐 admin</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies/" element={<MoviesProvider><MoviesPage /></MoviesProvider>} />
          <Route path="/github" element={<div>GitHub Page</div>} />
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