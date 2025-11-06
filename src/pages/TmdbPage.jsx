import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as tmdb from "../services/tmdbService";
import Feedback from './../components/Feedback';
import { useMoviesContext } from '../contexts/MoviesContext';

const IMG = (path, w = 200) => (path ? `https://image.tmdb.org/t/p/w${w}${path}` : '');

export default function TmdbPage() {
    const qc = useQueryClient();
    const { createMovie, lastAction, loading: catalogLoading, error: catalogError } = useMoviesContext();
    const [q, setQ] = useState('O senhor dos anéis');
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
            rating: typeof m.vote_average === 'number' ? Math.round(m.vote_average / 2) : 0,
        };
        await createMovie(movie);
    };

    const hasQuery = !!debounced.trim();

    return (
        <div className="card">
            <header className="header">
                <h2>Buscar Filmes (TMDB)</h2>
                <div className="header-actions" />
            </header>

            <div className="grid">
                <label className="col-span">
                    Títudo do Filme
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Ex.: O Senhor dos Áneis"
                        inputMode="search"
                    />
                </label>
            </div>

            <Feedback
                loading={isFetching}
                error={error?.message}
                success={hasQuery && results.length ? `Encontrados ${results.length} resultados` : ''}
            />
            
            <Feedback
                loading={catalogLoading}
                error={catalogError}
                success={lastAction?.message}
                duration={3000}
            />

            {!hasQuery && <p className="muted">Digite um título para buscar</p>}

            {results.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 12}}>
                    {
                        results.slice(0, 12).map((m) => (
                            <li
                                key={m.id}
                                className="card"
                                style={{marginBottom: 8, display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12}}
                                onMouseEnter={() => prefetchDetails(m.id)}
                            >
                                <div>
                                    {IMG(m.poster_path, 92) ? (
                                        <img
                                            src={IMG(m.poster_path, 92)}
                                            alt={m.title ?? m.original_title}
                                            width={64}
                                            height={96}
                                            style={{ borderRadius: 8, objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div
                                            className="cover placeholder"
                                            style={{
                                                width: 64,
                                                height: 96,
                                                borderRadius: 8,
                                                backgroundColor: '#eee',
                                            }}
                                        />
                                    )}
                                    --
                                </div>

                                <div>
                                    <div style={{ fontWeight: 600 }}>{m.title ?? m.original_title}</div>
                                    <div className="muted" style={{ fontFamily: 12 }}>
                                        {m.release_date ? `Ano: ${m.release_date.slice(0, 4)}` : 'Ano: —'} • Nota: {m.vote_average?.toFixed?.(1) ?? '—'}
                                    </div>
                                    <div className="muted" style={{ marginTop: 6 }}>
                                        {m.overview || 'Sem descrição'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <button className="primary" onClick={async () => await addToCatalog(m)}>
                                        Adicionar ao catálogo
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}