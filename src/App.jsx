import { useMemo, useState } from 'react'
import MovieForm from './components/MovieForm'
import MovieTable from './components/MovieTable'
import Feedback from './components/Feedback'
import SearchBar from './components/SearchBar'
import { MoviesProvider, useMoviesContext } from './context/MoviesContext';
import './index.css'

function MoviesPage() {
  const { movies, loading, error, lastAction, createMovie, updateMovie, deleteMovie, clearMovies, refresh } = useMoviesContext();
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return !q ? movies : movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, query]);

  const editingMovie = useMemo(() => movies.find((m) => m.id === editingId) || null, [movies, editingId]);
  const handleEdit = (id) => setEditingId(id);
  const handleCancelEdit = () => setEditingId(null);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className='container'>
      <header className='header'>
        <h1>Catálogo de Filmes</h1>
        <div className='header-actions'>
          <button className='ghost' onClick={() => clearMovies()}>Limpar Tudo</button>
        </div>
      </header>

      <Feedback loading={loading} error={error} success={lastAction?.message} />

      <SearchBar value={query} onSearch={setQuery} />

      <MovieForm
        onCreate={async (data) => {
          await createMovie(data);
          setQuery('');
        }}
        onUpdate={async (id, data) => {
          await updateMovie(id, data);
          await refresh();
          setQuery('');
        }}
        editingMovie={editingMovie}
        onCancelEdit={handleCancelEdit}
      />

      <MovieTable movies={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <footer className='footer'>
        <p>Desenvolvido por Thiago Santos</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <MoviesProvider>
      <MoviesPage />
    </MoviesProvider>
  )
}
