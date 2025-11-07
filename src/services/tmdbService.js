import { axiosWithAbort } from "../api/tmdb";

function withTimeout(promise, ms, onTimeout) {
    let t;
    const timeout = new Promise((_, reject) => {
        t = setTimeout(() => {
            onTimeout?.();
            reject(new Error('Tempo de requisição esgotado'));
        }, ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
}

export async function searchMovies(query, {signal, timeoutMs = 8000, page = 1 } = {}) {
    if(!query?.trim()) return {results: [], total_results:0};

    const {request, controller} = axiosWithAbort({
        url: '/search/movie',
        method: 'GET',
        params: { query, page, include_adult: false },
    }, signal);

    const onTimeout = () => controller.abort();
    return withTimeout(request.then((r) => r.data), timeoutMs, onTimeout);
}

export async function getMovieDetails(movieId, {signal, timeoutMs = 8000} = {}) {
    const {request, controller} = axiosWithAbort({
        url: `/movie/${movieId}`,
        method: 'GET',
    }, signal);

    const onTimeout = () => controller.abort();
    return withTimeout(request.then((r) => r.data), timeoutMs, onTimeout);
}
