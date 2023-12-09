<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla Actividades médicas-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">ID</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividad in actividades" :key="actividades.id">
          <td>{{ actividad.id }}</td>
          <td>{{ actividad.nombre }}</td>
          <td>{{ actividad.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaActividadesMedicas',
  data() {
    return {
      actividades: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `actividades_medicas/`)
      .then((response) => {
        this.actividades = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
