@extends('dash.layouts.main')
@section('contenido')
<div class="d-flex justify-content-between align-items-center mb-5">
                <h2 class="fw-bold m-0">Resumen General</h2>
                <div class="text-muted small">Última actualización: Hoy, 20:45</div>
            </div>

            <!-- Stats Grid -->
            <div class="row g-4 mb-5">
                <div class="col-md-4">
                    <div class="stat-card">
                        <div class="stat-icon bg-accent-soft">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="text-muted small fw-medium">Proyectos Activos</div>
                        <div class="h3 fw-bold mt-1">12</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card">
                        <div class="stat-icon bg-blue-soft">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="text-muted small fw-medium">Horas de Diseño (Mes)</div>
                        <div class="h3 fw-bold mt-1">456</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card">
                        <div class="stat-icon bg-green-soft">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="text-muted small fw-medium">Proyectos Finalizados</div>
                        <div class="h3 fw-bold mt-1">128</div>
                    </div>
                </div>
            </div>

            <!-- Recent Projects Table -->
            <div class="table-card">
                <div class="p-4 border-bottom d-flex justify-content-between align-items-center">
                    <h5 class="m-0 fw-bold">Proyectos Recientes</h5>
                    <button class="btn btn-sm btn-outline-secondary">Ver todo</button>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Fecha de Inicio</th>
                                <th>Progreso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Residencia Bosque Real</strong></td>
                                <td>Fam. Gutierrez</td>
                                <td><span class="badge-status bg-accent-soft text-warning">En Proceso</span></td>
                                <td>15 Feb, 2026</td>
                                <td>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-warning" style="width: 65%"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Torre Corporativa Delta</strong></td>
                                <td>Inmobiliaria Zen</td>
                                <td><span class="badge-status bg-blue-soft text-primary">Diseño</span></td>
                                <td>02 Feb, 2026</td>
                                <td>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-primary" style="width: 25%"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Villa Malibú</strong></td>
                                <td>John Doe</td>
                                <td><span class="badge-status bg-green-soft text-success">Completado</span></td>
                                <td>10 Ene, 2026</td>
                                <td>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-success" style="width: 100%"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
@endsection