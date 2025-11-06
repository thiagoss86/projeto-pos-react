import { useMemo, useState } from 'react'
import MovieForm from '../components/MovieForm'
import MovieTable from '../components/MovieTable'
import Feedback from '../components/Feedback'
import SearchBar from '../components/SearchBar'
import { useMoviesContext } from '../contexts/MoviesContext';

export default function MoviesPage() {
  const { 
    movies, 
    loading, 
    error, 
    lastAction, 
    createMovie, 
    updateMovie, 
    deleteMovie, 
    clearMovies, 
    refresh } = useMoviesContext();

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
    <>
      <Feedback loading={loading} error={error} success={lastAction?.message} />

      <div className='card'>
        <button className='ghost' onClick={() => clearMovies()}>Limpar Tudo</button>
        <button className='ghost' onClick={() => refresh()}>Atualizar Lista</button>
      </div>

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
    </>
  )
}
