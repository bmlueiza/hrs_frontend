<template>
  <div class="médicos">
    <Navbar />
    <div class="table-responsive">
      <table class="table table-light table-striped table-bordered">
        <!--Cabecera de la tabla Médicos-->
        <thead>
          <tr>
            <th class="header" scope="col">#</th>
            <th class="header" scope="col">RUT</th>
            <th class="header" scope="col">Nombre</th>
            <th class="header" scope="col">Apellido</th>
            <th class="header" scope="col">Especialidad</th>
          </tr>
        </thead>
        <!--Contenido de la tabla Médicos-->
        <tbody>
          <tr v-for="medico in todosLosMedicos" :key="medico.id">
            <th scope="row">{{ medico.id }}</th>
            <td>{{ medico.rut }}</td>
            <td>{{ medico.nombre }}</td>
            <td>{{ medico.apellido }}</td>
            <td>{{ medico.especialidad }}</td>
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
      todosLosMedicos: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/medicos')
      .then((response) => {
        this.todosLosMedicos = response.data
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
