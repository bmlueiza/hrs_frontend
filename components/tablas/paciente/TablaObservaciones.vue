<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped table-bordered">
      <!--Cabecera de la tabla Observaciones-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Observación</th>
          <th class="header" scope="col">Fecha</th>
          <th class="header" scope="col">Gestor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="observacion in observaciones" :key="observacion.id">
          <td>{{ observacion.contenido }}</td>
          <td>{{ observacion.fecha_generacion }}</td>
          <td>{{ observacion.gestor }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaObservacionesPaciente',
  props: ['pacienteID'],
  data() {
    return {
      observaciones: [],
    }
  },
  mounted() {
    this.getObservaciones()
  },
  methods: {
    //Obtener observaciones
    async getObservaciones() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `pacientes/${this.pacienteID}/observaciones`
        )
        this.observaciones = response.data.reverse()
      } catch (error) {
        console.error('Error al obtener las observaciones: ', error)
      }
    },
  },
}
</script>
<style scoped>
.table-responsive {
  max-height: 190px;
  overflow-y: auto;
}
</style>
