import { createContext, useEffect, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth_token";

async function mockVeirify({email, password}) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if(email === "admin@app.com" && password && password.length >= 6) {
        return { token: 'mock.jwt.token', user: {email, name: 'Administrador'}};
    }

    throw new Error("Credenciais inválidas");
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        try {
            const storagedToken = localStorage.getItem(STORAGE_KEY);
            if (storagedToken) {
                const parsed = JSON.parse(storagedToken);
                setToken(parsed.token);
                setUser(parsed.user);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async ({email, password}) => {
        setError(null);
        const res = await mockVeirify({email, password});
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }

    const value = useMemo(() => ({
        isAuthenticated: !!token,
        token,
        user,
        login,
        logout,
        loading,
        error
    }), [token, user, loading, error]);

    return (
        <AuthContext.Provider value={value}>
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