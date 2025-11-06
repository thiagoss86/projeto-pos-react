import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Feedback from './../components/Feedback';

export default function LoginPage() {
    const {login, error} = useAuth();
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
        <div className="card" style={{maxWidth: 420, margin: '40px auto'}}>
            <h2 style={{marginTop: 0}}>Login</h2>

            <Feedback loading={submitting} error={error} />

            <form onSubmit={handleSubmit} className="form">
                <div className="grid">
                    <label className="col-span">
                        E-mail
                        <input 
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            inputMode="email"
                        />
                    </label>
                    <label className="col-span">
                        Senha
                        <input 
                            type="password"
                            placeholder="mín 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                <div className="actions">
                    <button className="primary" type="submit" disabled={submitting}>
                         {submitting ? "Entrando..." : "Entrar"}
                    </button>
                    <NavLink to="/" className="ghost" style={{
                            textDecoration: 'none',
                            display: 'inline-block',
                            padding: '10px 15px',
                            borderRadius: 10,
                            border: '1px solid #ccc',
                        }}>
                        Cancelar
                    </NavLink>
                </div>

                <p className="muted" style={{marginTop: 10}}>
                    Dica: use <code>admin@app.com</code> como e-mail e qualquer senha com no mínimo 6 caracteres.
                </p>
            </form>
        </div>
    )
}