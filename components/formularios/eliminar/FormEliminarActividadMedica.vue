<template>
  <div>
    <!--Aviso normal-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <div class="eliminar-actividad-medica text-center">
      <h5>
        <p>¿Está seguro que desea eliminar la actividad</p>
        <p>{{ datosFormulario.nombre }}?</p>
      </h5>
      <button
        type="submit"
        class="btn btn-primary"
        @click="eliminarActividadMedica"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEliminarActividadMedica',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    async eliminarActividadMedica() {
      try {
        const response = await axios.delete(
          this.$axios.defaults.baseURL +
            `actividades_medicas/${this.datosFormulario.id}/`
        )
        this.mensajeAviso = 'Actividad médica eliminada correctamente'
        this.mensajeError = ''
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } catch (error) {
        this.mensajeAviso = ''
        this.mensajeError = 'Error al eliminar la actividad médica'
      }
    },
  },
}
</script>
