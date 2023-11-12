<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">HRS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/recomendaciones">Recomendaciones</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pacientes">Lista de pacientes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/diagnosticos">Diagnósticos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ingresarPaciente" aria-disabled="true"
              >Ingresar paciente</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/medicamentos">Medicamentos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/medicos">Médicos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/gestores">Gestores</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            id="busqueda"
            class="form-control me-2"
            type="search"
            placeholder="Búsqueda"
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">Buscar</button>
        </form>
        <ul class="navbar-nav me-2">
          <li class="nav-item">
            <a class="nav-link" href="/">Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
