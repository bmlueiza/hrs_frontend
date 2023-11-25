<template>
  <div class="table-responsive">
    <table
      class="table table-condensed table-hover table-striped table-bordered"
    >
      <!--Cabecera de la tabla Pacientes-->
      <thead class="table-light">
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
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Pacientes-->
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <th scope="row">{{ paciente.id }}</th>
          <td @click="seleccionarPaciente(paciente.id)">
            {{ paciente.nombres }}
          </td>
          <td>{{ paciente.apellido1 }}</td>
          <td>{{ paciente.apellido2 }}</td>
          <td>{{ paciente.rut }}</td>
          <td>{{ paciente.telefono }}</td>
          <td>{{ paciente.riesgo }}</td>
          <td>{{ formatDiagnostico(paciente.diagnosticos) }}</td>
          <td>{{ paciente.direccion }}</td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-default dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Acciones
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Editar</a></li>
                <li><a class="dropdown-item" href="#">Eliminar</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  props: ['terminoBusqueda'],
  watch: {
    terminoBusqueda(newTermino, oldTermino) {
      console.log('terminoBusqueda ha cambiado:', newTermino)
      // Realiza acciones adicionales si es necesario
    },
  },
  data() {
    return {
      pacientes: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `pacientes`)
      .then((response) => {
        this.pacientes = response.data
      })
      .catch((error) => {
        console.error('Error al obtener los pacientes: ', error)
      })
  },
  methods: {
    formatDiagnostico(diagnosticos) {
      return diagnosticos.join(', ')
    },
    seleccionarPaciente(pacienteID) {
      this.$router.push({ name: 'paciente', params: { id: pacienteID } })
    },
    actualizarTabla() {
      console.log('Evento actualizarTabla emitido desde TablaPacientes.vue')
      axios
        .get(
          this.$axios.defaults.baseURL +
            `pacientes?termino=${this.terminoBusqueda}`
        )
        .then((response) => {
          this.pacientes = response.data
          this.$emit('actualizarTabla')
        })
        .catch((error) => {
          console.error('Error al obtener los pacientes: ', error)
        })
    },
  },
}
</script>
<style scoped>
.table th:first-child,
.table td:first-child {
  border-left: none;
}
.table th:last-child,
.table td:last-child {
  border-right: none;
}
.table td:nth-child(5),
.table td:nth-child(6) {
  white-space: nowrap;
}
</style>
