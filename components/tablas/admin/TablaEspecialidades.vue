<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Especialidadess médicas-->
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="especialidad in especialidades" :key="especialidad.id">
          <td>{{ especialidad.id }}</td>
          <td>{{ especialidad.nombre }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaEspecialidades',
  data() {
    return {
      especialidades: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `especialidades_medicas/`)
      .then((response) => {
        this.especialidades = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
