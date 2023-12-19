<template>
  <div class="form-eliminar-paciente">
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
    <div class="eliminar-paciente text-center">
      <h5>
        <p>¿Está seguro que desea eliminar al paciente</p>
        <p>
          {{ datosFormulario.nombres }} {{ datosFormulario.apellido1 }}
          {{ datosFormulario.apellido2 }}?
        </p>
      </h5>
      <button type="submit" class="btn btn-primary" @click="eliminarPaciente">
        Eliminar
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEliminarPaciente',
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
    async eliminarPaciente() {
      try {
        const response = await axios.delete(
          this.$axios.defaults.baseURL + `pacientes/${this.datosFormulario.id}/`
        )
        this.mensajeAviso = 'Paciente eliminado correctamente'
        this.mensajeError = ''
        this.$nextTick(() => {
          this.$refs.tablaPacientes.actualizarTabla()
        })
      } catch (error) {
        this.mensajeAviso = ''
        this.mensajeError = 'Error al eliminar el paciente'
      }
    },
  },
  mounted() {
    console.log('Paciente', this.datosFormulario)
  },
}
</script>
