export default function Footer() {
    return (
        <footer className="footer" id="contacto">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-4">
                        <a href="#" className="footer-logo text-decoration-none">
                            <i className="fa-solid fa-compass-drafting"></i> ACME
                        </a>
                        <p className="footer-text">
                            Transformando ideas en realidades tangibles. Proveemos recursos arquitectónicos de la más alta
                            calidad para profesionales y entusiastas del diseño.
                        </p>
                        <div className="social-links">
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-pinterest"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#"><i className="fa-brands fa-behance"></i></a>
                        </div>
                    </div>

                    <div className="col-lg-2 offset-lg-1 col-md-6">
                        <h4 className="footer-heading">Tienda</h4>
                        <ul className="footer-links">
                            <li><a href="#">Planos Residenciales</a></li>
                            <li><a href="#">Planos Comerciales</a></li>
                            <li><a href="#">Modelos 3D</a></li>
                            <li><a href="#">Maquetas</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h4 className="footer-heading">Soporte</h4>
                        <ul className="footer-links">
                            <li><a href="#">Preguntas Frecuentes</a></li>
                            <li><a href="#">Términos y Condiciones</a></li>
                            <li><a href="#">Política de Devoluciones</a></li>
                            <li><a href="#">Guía de Licencias</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3">
                        <h4 className="footer-heading">Contacto</h4>
                        <ul className="footer-links">
                            <li className="d-flex mb-3">
                                <i className="fa-solid fa-location-dot mt-1 me-3 text-white-50"></i>
                                <span className="text-white-50">Av. Reforma 123, Ciudad de México, CP 06600</span>
                            </li>
                            <li className="d-flex mb-3">
                                <i className="fa-solid fa-envelope mt-1 me-3 text-white-50"></i>
                                <span className="text-white-50">contacto@acmearq.com</span>
                            </li>
                            <li className="d-flex">
                                <i className="fa-solid fa-phone mt-1 me-3 text-white-50"></i>
                                <span className="text-white-50">+52 (55) 1234-5678</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="mb-0">&copy; 2026 ACME Arquitectura. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}