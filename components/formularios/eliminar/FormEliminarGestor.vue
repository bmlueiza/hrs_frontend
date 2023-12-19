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
    <div class="eliminar-gestor text-center">
      <h5>
        <p>¿Está seguro que desea eliminar al gestor</p>
        <p>{{ datosFormulario.rut }}?</p>
      </h5>
      <button type="submit" class="btn btn-primary" @click="eliminarGestor">
        Eliminar
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEliminarGestor',
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
    async eliminarGestor() {
      try {
        const response = await axios.delete(
          this.$axios.defaults.baseURL + `gestores/${this.datosFormulario.id}/`
        )
        this.mensajeAviso = 'Gestor eliminado correctamente'
        this.mensajeError = ''
        this.setTimeout(() => {
          this.$router.push('/gestores')
        }, 4000)
      } catch (error) {
        this.mensajeAviso = ''
        this.mensajeError = 'Error al eliminar el gestor'
      }
    },
  },
  mounted() {
    console.log(this.datosFormulario)
  },
}
</script>
