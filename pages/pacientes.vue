<template>
  <div>
    <Navbar />
    <div class="table-responsive">
      <table class="table table-light table-striped table-bordered">
        <!--Cabecera de la tabla Pacientes-->
        <thead>
          <tr>
            <th class="header" scope="col">#</th>
            <th class="header" scope="col">Nombres</th>
            <th class="header" scope="col">Primer apellido</th>
            <th class="header" scope="col">Segundo apellido</th>
            <th class="header" scope="col">RUT</th>
            <th class="header" scope="col">Teléfono</th>
            <th class="header" scope="col">Riesgo</th>
            <th class="header" scope="col">Diagnóstico</th>
            <th class="header" scope="col">Dirección</th>
          </tr>
        </thead>
        <!--Contenido de la tabla Pacientes-->
        <tbody>
          <tr v-for="paciente in todosLosPacientes" :key="paciente.id">
            <th scope="row">{{ paciente.id }}</th>
            <td>{{ paciente.nombres }}</td>
            <td>{{ paciente.apellido1 }}</td>
            <td>{{ paciente.apellido2 }}</td>
            <td>{{ paciente.rut }}</td>
            <td>{{ paciente.telefono }}</td>
            <td>{{ paciente.riesgo }}</td>
            <td>{{ formatDiagnostico(paciente.diagnosticos) }}</td>
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
    axios
      .get('http://localhost:8000/hrsapp/api/pacientes')
      .then((response) => {
        this.todosLosPacientes = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    formatDiagnostico(diagnosticos) {
      return diagnosticos.join(', ')
    },
  },
}
</script>

<style>
.header {
  position: sticky;
  top: 0;
}
</style>
