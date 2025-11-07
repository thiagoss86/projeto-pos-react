import { useMemo, useState } from 'react'
import { Typography, Button } from '@mui/material'
import MovieForm from '../components/MovieForm'
import MovieTable from '../components/MovieTable'
import Feedback from '../components/Feedback'
import SearchBar from '../components/SearchBar'
import { useMoviesContext } from '../contexts/MoviesContext';
import { PageWarper, ActionsBar, RigthActions } from './MoviePage.styles';

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
    <PageWarper>
      <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>Base de dados</Typography>

      <Feedback loading={loading} error={error} lastAction={lastAction?.message} />

      <ActionsBar elevation={3}>
        <Typography variant='body2' color="textSecondary">
          {filtered?.length ?? 0} filme(s) listado(s)
        </Typography>
        <RigthActions>
          <Button variant='outlined' color='inherit' onClick={clearMovies}>
            Limpar Tudo
          </Button>
          <Button variant='outlined' color='inherit' onClick={refresh}>
            Recarregar
          </Button>
        </RigthActions>
      </ActionsBar>

      <SearchBar value={query} onSearch={setQuery} placeholder="Pesquisar filmes por nome..." />

      <MovieForm
        onCreate={async (data) => { await createMovie(data); setQuery(''); }}
        onUpdate={async (id, data) => { await updateMovie(id, data); await refresh(); setQuery('') }}
        editingMovie={editingMovie}
        onCancelEdit={handleCancelEdit}
      />
      <MovieTable
        movies={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageWarper>
  )
}
