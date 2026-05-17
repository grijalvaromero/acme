@extends('front.main')

@section('contenido')
     <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <span class="text-uppercase mb-3 d-block ls-2"
                        style="letter-spacing: 4px; color: var(--accent-color);">Estudio de Arquitectura</span>
                    <h1 class="hero-title">Diseñando el futuro, <br>respetando el entorno.</h1>
                    <p class="lead mb-5 text-light opacity-75">Creamos espacios que inspiran, emocionan y perduran en el
                        tiempo a través de una arquitectura honesta y sofisticada.</p>
                    <a href="#proyectos" class="btn btn-accent px-5 py-3">Explorar Proyectos</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="proyectos" class="section-padding">
        <div class="container">
            <h2 class="section-title">Nuestros Proyectos</h2>
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <div class="portfolio-item">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Residencia Aurora" class="portfolio-img">
                        <div class="portfolio-overlay">
                            <h4 class="mb-2">Residencia Aurora</h4>
                            <p class="small">Minimalismo & Naturaleza</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="portfolio-item">
                        <img src="https://images.unsplash.com/photo-1600607687940-4e32d00af45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Edificio Zenith" class="portfolio-img">
                        <div class="portfolio-overlay">
                            <h4 class="mb-2">Edificio Zenith</h4>
                            <p class="small">Corporativo Sustentable</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="portfolio-item">
                        <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Villa Marítima" class="portfolio-img">
                        <div class="portfolio-overlay">
                            <h4 class="mb-2">Villa Marítima</h4>
                            <p class="small">Diseño frente al mar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="servicios" class="section-padding bg-white">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5 mb-5 mb-lg-0">
                    <h2 class="section-title">Excelencia en cada detalle</h2>
                    <p class="text-muted mb-4">Nuestro enfoque integra la funcionalidad técnica con la belleza estética,
                        asegurando que cada proyecto sea único y eficiente.</p>
                    <ul class="list-unstyled">
                        <li class="mb-3"><i class="fas fa-check text-warning me-2"></i> Diseño Residencial de Lujo</li>
                        <li class="mb-3"><i class="fas fa-check text-warning me-2"></i> Planificación Urbana</li>
                        <li class="mb-3"><i class="fas fa-check text-warning me-2"></i> Interiorismo Corporativo</li>
                        <li class="mb-3"><i class="fas fa-check text-warning me-2"></i> Consultoría de Sustentabilidad
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6 offset-lg-1">
                    <div class="row g-4">
                        <div class="col-sm-6">
                            <div class="p-4 border">
                                <i class="fas fa-drafting-compass fa-2x mb-3 text-warning"></i>
                                <h4>Precisión</h4>
                                <p class="small text-muted">Planos meticulosos y ejecución técnica impecable.</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="p-4 border">
                                <i class="fas fa-leaf fa-2x mb-3 text-warning"></i>
                                <h4>Sustentable</h4>
                                <p class="small text-muted">Comprometidos con el impacto ambiental positivo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection