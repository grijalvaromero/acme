@extends('dash.layouts.main')
@section('contenido')
<div class="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 class="fw-bold m-0 text-dark">Gestión de Usuarios</h2>
                    <p class="text-muted m-0">Administra los accesos y roles de tu equipo.</p>
                </div>
                <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#addUserModal">
                    <i class="fas fa-plus me-2"></i> Nuevo Usuario
                </button>
            </div>

            <div class="user-card">
                @if($errors->any())
                    <div class="alert alert-danger">
                        <p><b>Error:</b></p>
                        <ul>
                            @foreach($errors->all()  as $error)
                                <li>{{$error}}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                @if(session('success'))
                    <div class="alert alert-success">
                        <p>Datos insertados correctamente</p>
                    </div>
                @endif
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Última Conexión</th>
                                <th class="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($users as $user)
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="avatar">AM</div>
                                        <div>
                                            <div class="fw-bold">{{ $user->name }}</div>
                                            <div class="small text-muted">{{ $user->email }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="text-dark">
                                    @if($user->rol == 1)
                                        <span>Administrador</span>
                                    @elseif($user->rol == 2)
                                        <span>Arquitecto</span>
                                    @else
                                        <span>Cliente</span>
                                    @endif
                                </span></td>
                                <td><span class="badge rounded-pill bg-success-subtle text-success px-3">Activo</span>
                                </td>
                                <td>Hace 10 min</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-link text-muted"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm btn-link text-danger"><i
                                            class="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

<!-- Add User Modal -->
<div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow-lg">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold">Agregar Nuevo Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST" action="/admin/saveusers">
                    @csrf
                    <div class="modal-body p-4">
                    
                            <div class="mb-3">
                                <label class="form-label small fw-bold text-muted text-uppercase">Nombre Completo</label>
                                <input type="text" class="form-control" placeholder="Ej. Roberto Gómez" name="name">
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-bold text-muted text-uppercase">Correo Electrónico</label>
                                <input type="email" class="form-control" placeholder="usuario@acmearch.com" name="email">
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold text-muted text-uppercase">Rol</label>
                                    <select class="form-select" name="rol">
                                        <option selected>Seleccionar...</option>
                                        <option value="1">Administrador</option>
                                        <option value="2">Arquitecto</option>
                                        <option value="3">Editor</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold text-muted text-uppercase">Password</label>
                                    <input type="password" class="form-control" placeholder="" name="password">
                                </div>
                            </div>
                            <div class="col-md-6">
                                    <label class="form-label small fw-bold text-muted text-uppercase">Zona</label>
                                    <select class="form-select" name="zone">
                                        <option selected>Seleccionar...</option>
                                       @foreach($zones as $zone)
                                            <option value="{{ $zone->id }}"> {{$zone->name }} </option>
                                       @endforeach
                                    </select>
                                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-accent px-4">Guardar Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection