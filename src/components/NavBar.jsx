import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className='header' style={{ marginBottom: 16 }}>
            <h1 style={{ margin: 0 }}>Catálogo de Filmes</h1>
            <div className="header-actions" style={{ gap: 8 }}>
                <NavLink className="link" to="/movies">🎬 Filmes</NavLink>
                <NavLink className="link" to="/tmdb">🎞️ TMDB</NavLink>
                <a
                    className='link'
                    href="https://github.com/thiagoss86/projeto-pos-react"
                    target='_blank'
                    rel='noreferrer'
                >
                    🐙 GitHub
                </a>
                <NavLink className="linl" to="/admin">⚙️ Admin</NavLink>

                {!isAuthenticated ? (
                    <NavLink className="link" to="/login">🔐 Login</NavLink>
                ) : (
                    <>
                        <span className="muted">Olá, {user?.name || 'Usuário'}</span>
                        <button className="ghost" onClick={logout}>🚪 Sair</button>
                    </>
                )}
            </div>
        </nav>
    );
}