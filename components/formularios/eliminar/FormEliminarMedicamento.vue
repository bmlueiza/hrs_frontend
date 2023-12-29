<template>
  <div>
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <div class="eliminar-medicamento text-center">
      <h5>
        <p>¿Está seguro que desea eliminar el medicamento</p>
        <p>{{ datosFormulario.nombre }}?</p>
      </h5>
      <button
        type="submit"
        class="btn btn-primary"
        @click="eliminarMedicamento"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEliminarMedicamento',
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
    async eliminarMedicamento() {
      try {
        const response = await axios.delete(
          this.$axios.defaults.baseURL +
            `medicamentos/${this.datosFormulario.id}/`
        )
        this.mensajeAviso = 'Medicamento eliminado correctamente'
        this.mensajeError = ''
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } catch (error) {
        this.mensajeAviso = ''
        this.mensajeError = 'Error al eliminar el medicamento'
      }
    },
  },
}
</script>
