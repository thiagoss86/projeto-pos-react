import { NavLink } from "react-router-dom";
import { Button, Typography, Link } from "@mui/material";
import { RootAppBar, RootToolbar, Actions } from "./NavBar.styles";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <RootAppBar position="static">
            <RootToolbar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Catálogo de Filmes</Typography>
                <Actions>
                    <Button component={NavLink} to="/movies">🎬 Filmes</Button>
                    <Button component={NavLink} to="/tmdb">🎞️ TMDB</Button>
                    <Link
                        href="https://github.com/thiagoss86/projeto-pos-react"
                        target='_blank'
                        rel='noreferrer'
                        underline="none"
                    >
                        🐙 GitHub
                    </Link>
                    <Button component={NavLink} to="/admin">⚙️ Admin</Button>

                    {!isAuthenticated ? (
                        <Button component={NavLink} to="/login" variant="contained">🔐 Login</Button>
                    ) : (
                        <>
                            <Typography variant="body2" component="text.secondary">
                                {user?.name || user?.email}
                            </Typography>
                            <Button onClick={logout} color="inherit">🚪 Sair</Button>
                        </>
                    )}
                </Actions>
            </RootToolbar>
        </RootAppBar>
    );
}