<template>
  <div class="FormEspecialidad">
    <!--Aviso de especilidad agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error al agregar especialidad-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="especialidad">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label required" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevaEspecialidad.nombre"
              maxlength="50"
            />
          </div>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row mt-3 text-center">
        <div class="col">
          <button
            type="button"
            class="btn btn-primary"
            @click="agregarEspecialidad"
          >
            Añadir
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="limpiarFormulario"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormEspecialidad',
  data() {
    return {
      nuevaEspecialidad: {
        nombre: '',
      },
      //Mensajes de error y aviso
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Función para agregar especialidad
    agregarEspecialidad() {
      if (this.validarFormulario()) {
        axios
          .post(
            this.$axios.defaults.baseURL + `especialidades_medicas/`,
            this.nuevaEspecialidad
          )
          .then((response) => {
            limpiarFormulario()
            this.mensajeAviso = 'Especialidad agregada correctamente.'
            setTimeout(() => {
              this.mensajeAviso = ''
              window.location.reload()
            }, 2100)
          })
          .catch((error) => {
            this.mensajeAviso = ''
            this.mensajeError = 'Error al agregar la Especialidad.'
            console.log('Error al añadir la especialidad', error)
          })
      }
    },
    //Función para validar formulario
    validarFormulario() {
      if (this.nuevaEspecialidad.nombre === '') {
        this.mensajeError = 'El campo Nombre es obligatorio.'
        return false
      } else {
        this.mensajeError = ''
        return true
      }
    },
    //Función para limpiar formulario
    async limpiarFormulario() {
      this.nuevaEspecialidad.nombre = ''

      this.mensajeAviso = ''
      this.mensajeError = ''
    },
  },
}
</script>
