import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import MoviesPage from './pages/MoviesPage';
import TmdbPage from './pages/TmdbPage';
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
            <NavLink className="link" to="/tmdb">🎞️ TMDB</NavLink>
            <a 
                className='link' 
                href="https://github.com/thiagoss86/projeto-pos-react"
                target='_blank'
                rel='noreferrer'
            >🐙 GitHub</a>
            <NavLink className="link" to="/admin">🔐 admin</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<MoviesProvider><MoviesPage /></MoviesProvider>} />
          <Route path="/tmdb" element={<MoviesProvider><TmdbPage /></MoviesProvider>} />
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