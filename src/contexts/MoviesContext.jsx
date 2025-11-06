import { createContext, useContext } from "react";
import { useMovies } from "../hooks/useMovies";

const MoviesContext = createContext(null);

export function MoviesProvider({ children }) {
    const moviesApi = useMovies();
    return <MoviesContext.Provider value={moviesApi}>{children}</MoviesContext.Provider>;
}

export const useMoviesContext = () => {
    const ctx = useContext(MoviesContext);
    if (!ctx) throw new Error("useMoviesContext deve ser usado dentro de <MoviesProvider>");
    return ctx;
};