const STORAGE_KEY = 'movies-db';
const delay = (ms = 300) => new Promise((res)=> setTimeout(res, ms));

const read = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const write  = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const loadMovies = async () => {
    await delay();
    return read();
};

export const createMovie = async ({ title, director, genre, releaseYear, rating }) => {
    await delay();
    const list = read();
    const movie = { id: crypto.randomUUID(), title, director, genre, releaseYear, rating };
    write ([...list, movie]);
    return movie;
};

export const updateMovie = async (id, data) => {
    await delay();
    const list = read();
    const idx = list.findIndex(movie => movie.id === id);
    if (idx === -1) throw new Error('Filme não encontrado');
    const updated = { ...list[idx], ...data };
    list[idx] = updated;
    write (list);
    return updated;
};

export const deleteMovie = async (id) => {
    await delay();
    const list = read();
    const movie = list.find(movie => movie.id === id);
    if (!movie) throw new Error('Filme não encontrado');
    write (list.filter(movie => movie.id !== id));
    return movie;
};

export const clearMovies = async () => {
    await delay();
    write ([]);
};
