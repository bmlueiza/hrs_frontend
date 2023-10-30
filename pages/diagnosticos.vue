<template>
  <div class="Diagnosticos">
    <Navbar />
    <div class="table-responsive">
      <table class="table table-light table-striped table-bordered">
        <!--Cabecera de la tabla Diagnósticos-->
        <thead>
          <tr>
            <th class="header" scope="col">#</th>
            <th class="header" scope="col">Código</th>
            <th class="header" scope="col">Nombre</th>
            <th class="header" scope="col">Descripción</th>
          </tr>
        </thead>
        <!--Contenido de la tabla Diagnósticos-->
        <tbody>
          <tr v-for="diagnostico in todosLosDiagnosticos" :key="diagnostico.id">
            <th scope="row">{{ diagnostico.id }}</th>
            <td>{{ diagnostico.codigo }}</td>
            <td>{{ diagnostico.nombre }}</td>
            <td>{{ diagnostico.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      todosLosDiagnosticos: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/diagnosticos')
      .then((response) => {
        this.todosLosDiagnosticos = response.data
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
