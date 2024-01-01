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
    <div class="eliminar-medico text-center">
      <h5>
        <p>¿Está seguro que desea eliminar al médico</p>
        <p>{{ datosFormulario.rut }}?</p>
      </h5>
      <button type="submit" class="btn btn-primary" @click="eliminarMedico">
        Eliminar
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEliminarMedico',
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
    async eliminarMedico() {
      try {
        const response = await axios.delete(
          this.$axios.defaults.baseURL + `medicos/${this.datosFormulario.id}/`
        )
        this.mensajeAviso = 'Médico eliminado correctamente'
        this.mensajeError = ''
        setTimeout(() => {
          this.mensajeAviso = ''
          window.location.reload()
        }, 2000)
      } catch (error) {
        this.mensajeAviso = ''
        this.mensajeError = 'Error al eliminar el médico'
      }
    },
  },
}
</script>
