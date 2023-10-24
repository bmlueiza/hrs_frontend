<template>
  <div>
    <Navbar />
    <div class="table-responsive">
      <table class="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th class="header" scope="col">#</th>
            <th class="header" scope="col">Nombres</th>
            <th class="header" scope="col">Primer apellido</th>
            <th class="header" scope="col">Segundo apellido</th>
            <th class="header" scope="col">RUT</th>
            <th class="header" scope="col">Teléfono</th>
            <th class="header" scope="col">Dirección</th>
            <th class="header" scope="col">Riesgo</th>
            <th class="header" scope="col">Diagnóstico</th>
            <th class="header" scope="col">Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paciente in todosLosPacientes" :key="paciente.id">
            <th scope="row">{{ paciente.id }}</th>
            <td>{{ paciente.nombres }}</td>
            <td>{{ paciente.primer_apellido }}</td>
            <td>{{ paciente.segundo_apellido }}</td>
            <td>{{ paciente.rut }}</td>
            <td>{{ paciente.telefono }}</td>
            <td>{{ paciente.direccion }}</td>
            <td>{{ paciente.riesgo }}</td>
            <td>{{ paciente.diagnostico }}</td>
            <td>{{ paciente.direccion }}</td>
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
      todosLosPacientes: [],
    }
  },
  mounted() {
    axios.get('http://localhost:8000/hrsapp/api/pacientes').then((response) => {
      this.todosLosPacientes = response.data
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
