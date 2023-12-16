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
    axios
      .get(
        this.$axios.defaults.baseURL +
          `pacientes/${this.pacienteID}/observaciones`
      )
      .then((response) => {
        this.observaciones = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
