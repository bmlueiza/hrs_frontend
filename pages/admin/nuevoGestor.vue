<template>
  <div>
    <navbar />
    <div class="container">
      <h2 class="text-center">Añadir nuevo gestor</h2>
      <form>
        <!-- Primera fila -->
        <div class="row">
          <!-- Primera columna - RUT -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="rut"
                name="rut"
                class="form-control"
                placeholder="Ej: 12345678-9"
                autocomplete="off"
              />
              <label class="form-label" for="rut">RUT</label>
            </div>
          </div>
          <!-- Segunda columna - nombre-->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="nombre"
                name="nombre"
                class="form-control"
                autocomplete="off"
              />
              <label class="form-label" for="nombre">Nombre</label>
            </div>
          </div>
          <!-- Tercera columna - apellido-->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="apellido"
                name="apellido"
                class="form-control"
                autocomplete="off"
              />
              <label class="form-label" for="apellido">Apellido</label>
            </div>
          </div>
        </div>
        <!-- Segunda fila -->
        <div class="row">
          <!-- Primera columna - correo -->
          <div class="col">
            <div class="form-outline">
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                autocomplete="off"
              />
              <label class="form-label" for="email">Correo</label>
            </div>
          </div>
          <!-- Segunda columna - contraseña -->
          <div class="col">
            <div class="form-outline">
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                autocomplete="off"
              />
              <label class="form-label" for="password">Contraseña</label>
            </div>
          </div>
        </div>
      </form>
      <div class="text-center">
        <!--Botón añadir gestor-->
        <button @click="crearGestor" type="button" class="btn btn-primary">
          Añadir gestor
        </button>
        <!--Botón cancelar-->
        <button
          @click="limpiarFormulario"
          type="button"
          class="btn btn-primary"
        >
          Cancelar
        </button>
        <!-- Aviso de gestor agregado correctamente -->
        <div v-if="gestorAgregado" class="alert alert-success" role="alert">
          Gestor agregado correctamente
        </div>
        <!-- Aviso de error al agregar gestor -->
        <div v-if="errorAlAgregar" class="alert alert-danger" role="alert">
          Error al agregar gestor. Por favor, inténtalo de nuevo.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'

export default {
  data() {
    return {
      nuevoGestor: {
        rut: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
      },
      gestorAgregado: false,
      errorAlAgregar: false,
    }
  },
  methods: {
    crearGestor() {
      axios
        .post(
          'http://localhost:8000/hrsapp/api/gestores/create',
          this.nuevoGestor
        )
        .then((response) => {
          console.log(response)
          this.gestorAgregado = true
        })
        .catch((error) => {
          console.log('Error al añadir nuevo paciente', error)
          this.errorAlAgregar = true
        })
    },
    limpiarFormulario() {
      this.nuevoGestor.rut = ''
      this.nuevoGestor.nombre = ''
      this.nuevoGestor.apellido = ''
      this.nuevoGestor.email = ''
      this.nuevoGestor.password = ''
    },
  },
}
</script>
