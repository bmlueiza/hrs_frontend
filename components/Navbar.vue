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
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/recomendaciones">Recomendaciones</a>
          </li>
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/pacientes">Lista de pacientes</a>
          </li>
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/ingresarPaciente">Ingresar paciente</a>
          </li>
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/diagnosticos">Diagnósticos</a>
          </li>
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/medicamentos">Medicamentos</a>
          </li>
          <li class="nav-item custom-hover2">
            <a class="nav-link" href="/medicos">Médicos</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="adminDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Administración
            </a>
            <div class="dropdown-menu">
              <!-- Enlaces dentro del desplegable -->
              <a class="dropdown-item custom-hover" href="/admin/gestores"
                >Gestores</a
              >
              <a class="dropdown-item custom-hover" href="/admin/administracion"
                >Panel de administracion</a
              >
            </div>
          </li>
        </ul>
        <div class="d-flex">
          <input
            id="busquedaDirecta"
            class="form-control"
            type="search"
            placeholder="Buscar paciente"
          />
          <button class="btn btn-outline-light" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <ul class="navbar-nav me-2">
          <a class="nav-link" href="/">
            <button class="btn btn-outline-dark" type="submit">
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </a>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.form-control {
  height: fit-content !important;
  align-self: center;
}
nav {
  background-color: #3f72af;
  color: #f9f7f7;
}

.navbar-brand {
  color: #f9f7f7;
}
.dropdown-menu {
  background: #112d4e;
}
.dropdown-item {
  color: #f9f7f7;
}
.custom-hover:hover {
  background-color: #3f72af !important;
  color: #f9f7f7 !important;
}
.custom-hover2:hover {
  background-color: #3f72af !important;
  border-radius: 10px;
}
.navbar-nav {
  --bs-nav-link-hover-color: #f9f7f7 !important;
}
@media (min-width: 991px) {
  nav {
    height: 58px;
  }
}
</style>
