import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Feedback from './../components/Feedback';
import { AuthCard, FormRow, Actions } from './LoginPage.styles';
import { Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
    const { login, error } = useAuth();
    const [email, setEmail] = useState("admin@app.com");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) alert("Preencha e-mail e senha para continuar");
        try {
            setSubmitting(true);
            await login({ email, password });
            navigate(from, { replace: true });
        } catch (error) {
            alert("Erro ao fazer login");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthCard component="form" onSubmit={handleSubmit} elevation={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Login
            </Typography>
            <Feedback loading={submitting} error={error} />

            <FormRow>
                <TextField
                    autoFocus
                    type="email" label="E-mail"
                    placeholder="exemple@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password" label="Senha"
                    placeholder="********" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRow>

            <Actions>
                <Button type="submit" variant="contained" disabled={submitting} fullWidth>
                    {submitting ? "Entrando..." : "Entrar"}
                </Button>
                <Button component={NavLink} to="/" variant="outlined" color="inherit" fullWidth>
                    Voltar
                </Button>
            </Actions>

            <Typography variant="caption" component="text.secondary" sx={{ mt: 1, display: "block" }}>
                Dica: use <code>admin@app.com</code> como e-mail e qualquer senha 6+ caracteres.
            </Typography>
        </AuthCard>
    )
}