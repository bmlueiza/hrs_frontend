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
          <li v-if="this.gestorInfo.admin" class="nav-item dropdown">
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
          <b-typeahead
            id="buscadorPerfilPaciente"
            class="buscador"
            :data="
              pacientes.map(
                (paciente) =>
                  paciente.nombres +
                  ' ' +
                  paciente.apellido1 +
                  ' ' +
                  paciente.apellido2
              )
            "
            placeholder="Buscar paciente..."
            autocomplete="off"
            @hit="onHit"
          ></b-typeahead>
          <button
            class="btn btn-outline-light"
            type="submit"
            @click="irPerfilPaciente"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
        <ul class="navbar-nav me-2">
          <a class="nav-link" href="/">
            <button class="btn btn-outline-light" type="submit" @click="logout">
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </a>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from 'axios'
import BTypeahead from 'vue-bootstrap-typeahead'

export default {
  name: 'Navbar',
  components: {
    BTypeahead,
  },
  data() {
    return {
      gestorInfo: '',
      gestorID: '',
      pacientes: [],
      pacienteSeleccionado: '',
    }
  },
  methods: {
    async getPacientesGestor() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `pacientes/gestor/${this.gestorID}/`
        )
        this.pacientes = response.data
      } catch (error) {
        console.log('Error al obtener los pacientes de este gestor', error)
      }
    },
    onHit(item) {
      // Se ejecuta cuando se selecciona un paciente
      this.pacienteSeleccionado = this.pacientes.find(
        (paciente) =>
          paciente.nombres +
            ' ' +
            paciente.apellido1 +
            ' ' +
            paciente.apellido2 ===
          item
      )
    },
    irPerfilPaciente() {
      if (this.pacienteSeleccionado === '') {
        return
      } else {
        console.log('Paciente seleccionado: ', this.pacienteSeleccionado)
        this.$router.push('/paciente/' + this.pacienteSeleccionado.id)
      }
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('gestor')
      this.$router.push('/')
    },
  },
  mounted() {
    const gestorInfoString = localStorage.getItem('gestor')

    if (gestorInfoString) {
      this.gestorInfo = JSON.parse(gestorInfoString)
      this.gestorID = JSON.parse(gestorInfoString).id
    }

    this.getPacientesGestor()
  },
}
</script>
<style scoped>
.buscador {
  height: fit-content !important;
  align-self: center;
  z-index: 2000;
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
