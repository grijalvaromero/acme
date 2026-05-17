import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login({ email, password }, remember);
            const from = (location.state as any)?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                const apiError = err.response.data.error;
                if (apiError === "Invalid credentials") {
                    setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
                } else {
                    setError(apiError);
                }
            } else {
                setError("Ocurrió un error al intentar iniciar sesión. Por favor, verifica tu conexión.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <section className="hero-section" style={{ height: '100vh', marginTop: 0, minHeight: '800px' }}>
                <div className="container px-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8">
                            <div className="card border-0 shadow-lg overflow-hidden rounded-0 bg-white">
                                <div className="card-body p-4 p-md-5">
                                    <div className="text-center mb-4">
                                        <Link to="/" className="navbar-brand fs-1 mb-2 d-block text-decoration-none" style={{ color: 'var(--primary-color)' }}>
                                            <i className="fa-solid fa-compass-drafting me-2" style={{ color: 'var(--accent-color)' }}></i>ACME
                                        </Link>
                                        <span className="hero-subtitle mb-2" style={{ fontSize: '0.8rem' }}>Bienvenido de nuevo</span>
                                        <h2 className="section-title mb-0" style={{ fontSize: '2rem' }}>Acceder a Cuenta</h2>
                                    </div>

                                    {error && (
                                        <div className="alert border-0 rounded-0 p-3 mb-4 d-flex align-items-center animate__animated animate__fadeIn" 
                                             style={{ 
                                                 backgroundColor: 'rgba(197, 168, 128, 0.12)', 
                                                 borderLeft: '4px solid var(--accent-color)', 
                                                 color: 'var(--primary-color)'
                                             }}>
                                            <i className="fa-solid fa-circle-exclamation me-3 fs-5" style={{ color: 'var(--accent-color)' }}></i>
                                            <div className="small fw-semibold">{error}</div>
                                        </div>
                                    )}
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label text-uppercase small fw-bold text-muted mb-2" style={{ letterSpacing: '1px' }}>
                                                Correo Electrónico
                                            </label>
                                            <input 
                                                type="email" 
                                                className="form-control rounded-0 py-3 border-0 bg-light px-4" 
                                                placeholder="ejemplo@acme.com" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <label className="form-label text-uppercase small fw-bold text-muted mb-0" style={{ letterSpacing: '1px' }}>
                                                    Contraseña
                                                </label>
                                                <a href="#" className="small text-decoration-none text-muted">¿Olvidaste tu contraseña?</a>
                                            </div>
                                            <input 
                                                type="password" 
                                                className="form-control rounded-0 py-3 border-0 bg-light px-4" 
                                                placeholder="••••••••" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input rounded-0 mt-0" 
                                                id="remember" 
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                                disabled={loading}
                                            />
                                            <label className="form-check-label small text-muted ms-2" htmlFor="remember" style={{ userSelect: 'none', cursor: 'pointer' }}>
                                                Recordarme en este equipo
                                            </label>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn btn-custom w-100 py-3 mb-4 d-flex align-items-center justify-content-center"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Iniciando Sesión...
                                                </>
                                            ) : (
                                                <>
                                                    Iniciar Sesión <i className="fa-solid fa-arrow-right ms-2"></i>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                    
                                    <div className="text-center pt-2 border-top">
                                        <p className="text-muted small mb-0 pt-3">
                                            ¿No tienes una cuenta? <a href="#" className="fw-bold text-decoration-none" style={{ color: 'var(--accent-color)' }}>Solicitar acceso</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/" className="text-white-50 text-decoration-none small hover-opacity">
                                    <i className="fa-solid fa-arrow-left me-2"></i> Volver a la página de inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}