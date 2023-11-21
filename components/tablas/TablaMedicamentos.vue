<template>
  <div class="table-responsive">
    <table class="table table-light table-striped table-bordered">
      <!--Cabecera de la tabla Medicamentos-->
      <thead>
        <tr>
          <th class="header" scope="col">#</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Descripción</th>
        </tr>
      </thead>
      <!--Contenido de la tabla Medicamentos-->
      <tbody>
        <tr v-for="medicamento in todosLosMedicamentos" :key="medicamento.id">
          <th scope="row">{{ medicamento.id }}</th>
          <td>{{ medicamento.nombre }}</td>
          <td>{{ medicamento.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      todosLosMedicamentos: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/medicamentos')
      .then((response) => {
        this.todosLosMedicamentos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
<style>
.header {
  position: sticky;
  top: 0;
}
</style>
