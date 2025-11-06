import axios from 'axios';

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
if (!TMDB_KEY) {
    console.warn("⚠️ VITE_TMDB_KEY não definida. Crie .env com VITE_TMDB_KEY=...");
}

export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 1000,
    params: {
        api_key: TMDB_KEY,
        language: 'pt-BR',
    },
});

export function axiosWithAbort(config = {}, signal) {
    const controller = new AbortController();
    const finalSignal = signal ?? controller.signal;
    return {
        request: tmdb.request({
            ...config,
            signal: finalSignal,
        }),
        controller,
    };
}

tmdb.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.name === 'CanceledError') {
            return Promise.reject(new Error('Requisição cancelada pelo usuário'));
        }
        if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
            return Promise.reject(new Error('Tempo de requisição esgotado'));
        }
        return Promise.reject(err);
    }
);