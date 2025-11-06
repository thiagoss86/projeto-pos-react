import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuth] = useState(false);
    const login = () => setIsAuth(true);
    const logout = () => setIsAuth(false);
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const cxt = useContext(AuthContext);
    if (!cxt) {
        throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
    }
    return cxt;
}