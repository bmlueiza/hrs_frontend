<template>
  <div>
    <!--Aviso de resultado agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error al agregar resultado-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="actividad">
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
              v-model="nuevaActividad.nombre"
              maxlength="50"
            />
          </div>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - descripción-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="descripcion">Descripción</label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              class="form-control"
              placeholder="No obligatorio. Máximo 100 caracteres."
              v-model="nuevaActividad.descripcion"
              maxlength="100"
            ></textarea>
          </div>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row mt-3 text-center">
        <div class="col">
          <button
            type="submit"
            class="btn btn-primary"
            @click="agregarActividad"
          >
            Agregar
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
  name: 'FormActividadMedica',
  data() {
    return {
      nuevaActividad: {
        nombre: '',
        descripcion: '',
      },
      modoEditar: false,
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    async agregarActividad() {
      if (this.validarFormulario()) {
        try {
          const respuesta = await axios.post(
            this.$axios.defaults.baseURL + 'actividades_medicas/',
            this.nuevaActividad
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Actividad agregada correctamente.'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 3000)
        } catch (error) {
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar actividad.'
        }
      }
    },
    validarFormulario() {
      if (
        this.nuevaActividad.nombre == '' ||
        this.nuevaActividad.descripcion == ''
      ) {
        this.mensajeError = 'El campo Nombre es obligatorio.'
        return false
      }
      return true
    },
    limpiarFormulario() {
      this.nuevaActividad.nombre = ''
      this.nuevaActividad.descripcion = ''
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
  },
}
</script>
