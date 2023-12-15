<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla Actividades médicas-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Fecha asignación</th>
          <th class="header" scope="col">Actividad</th>
          <th class="header" scope="col">Fecha actividad</th>
          <th class="header" scope="col">Estado</th>
          <th class="header" scope="col">Médico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividad in actividades" :key="actividades.id">
          <td>{{ actividad.fecha_asignacion }}</td>
          <td>{{ actividad.actividad_medica }}</td>
          <td>{{ actividad.fecha_actividad }}</td>
          <td>{{ actividad.estado }}</td>
          <td>{{ actividad.medico }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaAsignacionActividades',
  props: ['pacienteID'],
  data() {
    return {
      actividades: [],
    }
  },
  mounted() {
    console.log(this.pacienteID)
    axios
      .get(
        this.$axios.defaults.baseURL +
          `asignacion_actividades/paciente/${this.pacienteID}/`
      )
      .then((response) => {
        this.actividades = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
