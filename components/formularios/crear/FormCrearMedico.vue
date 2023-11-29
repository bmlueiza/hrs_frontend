<template>
  <div>
    <!-- Aviso de medico agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar medico -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="medico">
      <!-- Primera fila -->
      <div class="row">
        <!-- Primera columna - rut -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="rut">Rut</label>
            <input
              type="text"
              id="rut"
              name="rut"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.rut"
              maxlength="12"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - especialidad -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="especialidad">Especialidad</label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.especialidad"
              maxlength="50"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!-- Primera columna - nombre -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.nombre"
              maxlength="25"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - apellido -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.apellido"
              maxlength="25"
              required
            />
          </div>
        </div>
      </div>
    </form>
    <div class="botones text-center">
      <button type="button" class="btn btn-primary" @click="agregarMedico">
        Agregar
      </button>
      <button type="button" class="btn btn-primary" @click="limpiarFormulario">
        Limpiar
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormCrearMedico',
  data() {
    return {
      nuevoMedico: {
        rut: '',
        especialidad: '',
        nombre: '',
        apellido: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    async agregarMedico() {
      if (this.validarFormulario()) {
        try {
          console.log('Nuevo medico:', this.nuevoMedico)
          const response = await axios.post(
            this.$axios.defaults.baseURL + 'medicos/',
            this.nuevoMedico,
            { headers: { 'Content-Type': 'application/json' } }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Medico agregado correctamente'
        } catch (error) {
          console.log(error)
          this.mensajeError = 'Error al agregar medico'
          this.mensajeAviso = ''
        }
      }
    },
    validarFormulario() {
      if (this.nuevoMedico.rut.trim() === '') {
        this.mensajeError = 'Debe ingresar un rut'
        return false
      }
      if (this.nuevoMedico.especialidad.trim() === '') {
        this.mensajeError = 'Debe ingresar una especialidad'
        return false
      }
      if (this.nuevoMedico.nombre.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre'
        return false
      }
      if (this.nuevoMedico.apellido.trim() === '') {
        this.mensajeError = 'Debe ingresar un apellido'
        return false
      }
      return true
    },
    async limpiarFormulario() {
      this.nuevoMedico.rut = ''
      this.nuevoMedico.especialidad = ''
      this.nuevoMedico.nombre = ''
      this.nuevoMedico.apellido = ''
      this.mensajeError = ''
      this.mensajeAviso = ''
    },
  },
}
</script>
<style scoped>
.row {
  margin-bottom: 10px;
}
.btn {
  margin: 5px;
}
.form-label {
  font-weight: bold;
}
</style>
