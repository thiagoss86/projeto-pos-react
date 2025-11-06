import { createContext, use, useContext } from "react";
import { useMovies } from "../hooks/useMovies";
import { useMovies } from './../hooks/useMovies';

const MovieContext = createContext(null);

export function MoviesProvider({ children }) {
    const movies = useMovies();
    return <MovieContext.Provider value={movies}>{children}</MovieContext.Provider>;
}

export const useMoviesContext = () => {
    const ctx = useContext(MovieContext);
    if (!ctx) throw new Error("useMoviesContext must be used within a MoviesProvider");
    return ctx;
};