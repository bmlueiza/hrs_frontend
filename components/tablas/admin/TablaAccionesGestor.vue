<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Acciones de un gestor-->
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="accion in acciones" :key="acciones.id">
          <td>{{ accion.id }}</td>
          <td>{{ accion.nombre }}</td>
          <td>{{ accion.estado }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaAccionesGestor',
  data() {
    return {
      acciones: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `acciones_gestor/`)
      .then((response) => {
        this.acciones = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
