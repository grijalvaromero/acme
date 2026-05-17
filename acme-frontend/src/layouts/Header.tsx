import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isAuthenticated, logout } from "../services/auth";

export default function Header() {
    const [quantity, setQuantity] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cartStr = localStorage.getItem("acme_cart");
        if (cartStr) {
            const items = JSON.parse(cartStr);
            setQuantity(items.length);
        }

        if (isAuthenticated()) {
            setUser(getUser());
        }
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setDropdownOpen(false);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <i className="fa-solid fa-compass-drafting"></i>ACME
                </Link>

                {/* Mobile cart (visible only on small screens) */}
                <Link to="/carrito" className="cart-icon d-lg-none ms-auto me-3 text-decoration-none">
                    <i className="fa-solid fa-bag-shopping"></i>
                    <span className="cart-badge">{quantity}</span>
                </Link>

                <button 
                    className="navbar-toggler border-0 shadow-none" 
                    type="button" 
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars fs-4"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#productos">Catálogo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#servicios">Servicios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contacto">Contacto</a>
                        </li>
                        
                        {/* Mobile User Actions (visible only on small screens) */}
                        <li className="nav-item d-lg-none mt-2 pt-2 border-top">
                            {user ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="nav-link text-start bg-transparent border-0 w-100 text-danger d-flex align-items-center"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Cerrar Sesión ({user.name.split(" ")[0]})
                                </button>
                            ) : (
                                <Link className="nav-link d-flex align-items-center" to="/login">
                                    <i className="fa-regular fa-user me-2"></i> Iniciar Sesión
                                </Link>
                            )}
                        </li>
                    </ul>

                    {/* Desktop Actions */}
                    <div className="d-none d-lg-flex align-items-center">
                        <a href="#buscar" className="nav-link me-3"><i className="fa-solid fa-magnifying-glass"></i></a>
                        
                        {user ? (
                            <div className="position-relative me-3">
                                <button 
                                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                                    className="nav-link bg-transparent border-0 d-flex align-items-center px-0 py-1"
                                    style={{ textTransform: "none", cursor: "pointer", gap: "6px" }}
                                >
                                    <i className="fa-regular fa-user" style={{ color: "var(--accent-color)" }}></i>
                                    <span className="small fw-semibold">{user.name.split(" ")[0]}</span>
                                    <i className="fa-solid fa-chevron-down extra-small" style={{ fontSize: "0.65rem", opacity: 0.7 }}></i>
                                </button>
                                
                                {dropdownOpen && (
                                    <div 
                                        className="position-absolute end-0 bg-white border shadow-sm py-1 mt-2 rounded-0" 
                                        style={{ zIndex: 1000, minWidth: "160px", top: "100%" }}
                                    >
                                        <button 
                                            onClick={handleLogout} 
                                            className="dropdown-item btn btn-link w-100 text-start text-dark px-3 py-2 border-0 bg-transparent d-flex align-items-center"
                                            style={{ 
                                                fontSize: "0.85rem", 
                                                textDecoration: "none",
                                                transition: "background-color 0.2s"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            <i className="fa-solid fa-arrow-right-from-bracket me-2 text-danger"></i> 
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="nav-link me-3"><i className="fa-regular fa-user"></i></Link>
                        )}

                        <Link to="/carrito" className="cart-icon text-decoration-none">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="cart-badge">{quantity}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}