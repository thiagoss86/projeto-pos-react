import { useState, useEffect } from 'react';
import * as svc from '../services/movies';
import { loadMovies, updateMovie, clearMovies } from './../services/movieService';
import { set } from 'mongoose';

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastAction, setLastAction] = useState(null);

    useEffect(() => {
        setLoading(true);
        svc.loadMovies()
            .then(setMovies)
            .catch((e) => setError(e?.message || 'Falha ao carregar os filmes'))
            .finally(() => setLoading(false));
    }, []);

    const createMovie = async ({ title, director, genre, releaseYear, rating }) => {
        setLoading(true);
        setError(null);
        try {
            const created = await svc.createMovie({ title, director, genre, releaseYear, rating });
            setMovies((prevMovies) => [...prevMovies, created]);
            setLastAction({ type: 'create', message: `Filme "${created.title}" criado com sucesso` });
            return created;
        } catch (e) {
            setError(e?.message || 'Falha ao criar o filme');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const updateMovie = async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await svc.updateMovie(id, data);
            setMovies((prevMovies) => prevMovies.map((m) => (m._id === id ? { ...m, ...updated } : m)));
            setLastAction({ type: 'update', message: `Filme "${updated.title}" atualizado com sucesso` });
            return updated;
        } catch (e) {
            setError(e?.message || 'Falha ao atualizar o filme');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const deleteMovie = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const removed = await svc.deleteMovie(id);
            setMovies((prevMovies) => prevMovies.filter((m) => m.id !== id));
            setLastAction({ type: 'delete', message: `Filme "${removed.title}" removido com sucesso` });
            return removed;
        } catch (e) {
            setError(e?.message || 'Falha ao remover o filme');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const clearMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            await svc.clearMovies();
            setMovies([]);
            setLastAction({ type: 'clear', message: 'Todos os filmes foram removidos com sucesso' });
        } catch (e) {
            setError(e?.message || 'Falha ao limpar os filmes');
            throw e;
        } finally {
            setLoading(false);
        }
    };
}
