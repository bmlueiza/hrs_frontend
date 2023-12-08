<template>
  <div class="table-responsive">
    <table class="table table-condensed table-striped table-bordered">
      <!--Cabecera de la tabla Resultados de contacto-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">ID</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="resultado in resultados" :key="resultados.id">
          <td>{{ resultado.id }}</td>
          <td>{{ resultado.nombre }}</td>
          <td>{{ resultado.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaResultadosContacto',
  data() {
    return {
      resultados: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `resultados_contacto/`)
      .then((response) => {
        this.resultados = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
