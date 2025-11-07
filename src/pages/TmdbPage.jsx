import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Typography, Grid, CardMedia, CardContent, CardActions, Button, Stack } from "@mui/material";
import * as tmdb from "../services/tmdbService";
import Feedback from './../components/Feedback';
import { useMoviesContext } from '../contexts/MoviesContext';
import { PageCard, ResultsGrid, ResultCard } from './TmdbPage.styles';

const IMG = (path, w = 200) => (path ? `https://image.tmdb.org/t/p/w${w}${path}` : '');

export default function TmdbPage() {
    const qc = useQueryClient();
    const { createMovie, lastAction, loading: catalogLoading, error: catalogError } = useMoviesContext();
    const [q, setQ] = useState('');
    const [debounced, setDebounced] = useState(q);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(q), 500);
        return () => clearTimeout(t);
    }, [q]);

    const { data, isFetching, error } = useQuery({
        queryKey: ['tmdb', 'search', debounced],
        queryFn: ({ signal }) => tmdb.searchMovies(debounced, { signal }),
        enabled: !!debounced.trim(),
        staleTime: 1000 * 60 * 5,
    });

    const results = data?.results ?? [];

    const prefetchDetails = (movieId) => {
        qc.prefetchQuery({
            queryKey: ['tmdb', 'movie', movieId],
            queryFn: ({ signal }) => tmdb.getMovieDetails(movieId, { signal }),
            staleTime: 1000 * 60 * 10,
        });
    };

    const addToCatalog = async (m) => {
        const movie = {
            title: m.title ?? m.original_title ?? 'Sem título',
            director: '',
            genre: Array.isArray(m.genres_ids) && m.genres_ids.length ? `Gênero #${m.genre_ids[0]}` : '',
            releaseYear: (m.release_date || '').slice(0, 4),
            rating: typeof m.vote_average === 'number' ? m.vote_average : 0,
        };
        await createMovie(movie);
    };

    const hasQuery = !!debounced.trim();

    return (
        <PageCard elevation={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h5">Buscar filmes no TMDB</Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Pesquisa por nome do filme"
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: '1px solid #2a2a45',
                        background: 'transparent',
                        color: 'inherit',
                        outline: 'none',
                    }}
                />
            </Stack>

            <Feedback
                loading={isFetching}
                error={error?.message}
                success={debounced && results.length ? `Encontrados ${results.length} resultados` : ''}
            />
            <Feedback
                loading={catalogLoading}
                error={catalogError}
                success={lastAction?.message}
            />

            <ResultsGrid container spacing={2}>
                {results.slice(0, 12).map((m) => (
                    <Grid item key={m.id} xs={12} sm={6} md={4} lg={3} onMouseEnter={() => prefetchDetails(m.id)}>
                        <ResultCard elevation={2}>
                            {IMG(m.poster_path, 342) ? (
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={IMG(m.poster_path, 342)}
                                    alt={m.title}
                                />
                            ) : (
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 180,
                                        display: 'grid',
                                        placeItems: 'center',
                                        bgcolor: 'action.hover'
                                    }}>
                                    - Sem imagem -
                                </CardMedia>
                            )}

                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {m.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {m.release_date ? `Lançamento: ${m.release_date}` : 'Data de lançamento desconhecida'}
                                    • Nota: {m.vote_average?.toFixed?.(1) ?? '—'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {m.overview ? m.overview.slice(0, 100) + (m.overview.length > 100 ? '...' : '') : 'Sem descrição disponível.'}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button variant="contained" size="small" onClick={() => addToCatalog(m)}>
                                    Adicionar ao catálogo
                                </Button>
                            </CardActions>
                        </ResultCard>
                    </Grid>
                ))}
            </ResultsGrid>
        </PageCard>
    );
}