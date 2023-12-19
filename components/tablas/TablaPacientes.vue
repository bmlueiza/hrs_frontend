<template>
  <div>
    <div class="table-responsive">
      <table class="table table-sm table-hover table-striped table-bordered">
        <!--Cabecera de la tabla Pacientes-->
        <thead class="table-light">
          <tr>
            <th class="header" scope="col"></th>
            <th class="header" scope="col">RUT</th>
            <th class="header" scope="col">Nombres</th>
            <th class="header" scope="col">Primer apellido</th>
            <th class="header" scope="col">Segundo apellido</th>
            <th class="header" scope="col">Riesgo</th>
            <th class="header" scope="col">Diagnóstico</th>
            <th class="header" scope="col">Teléfono</th>
            <th class="header" scope="col">Dirección</th>
            <th class="header" scope="col"></th>
          </tr>
        </thead>
        <!--Contenido de la tabla Pacientes-->
        <tbody>
          <tr v-for="paciente in pacientes" :key="paciente.id">
            <td @click="seleccionarPaciente(paciente.id)">
              <button type="button" class="btn btn-primary btn-sm">Ver</button>
            </td>
            <td>{{ paciente.rut }}</td>
            <td>{{ paciente.nombres }}</td>
            <td>{{ paciente.apellido1 }}</td>
            <td>{{ paciente.apellido2 }}</td>
            <td>{{ paciente.riesgo }}</td>
            <td>{{ formatDiagnostico(paciente.diagnosticos) }}</td>
            <td>{{ paciente.telefono }}</td>
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
                  <li>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${modalId}`"
                      @click="
                        abrirModal(
                          'FormEliminarPaciente',
                          'Eliminar paciente',
                          paciente
                        )
                      "
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-3">
      <p v-if="pacientes.length > 0">
        Mostrando {{ pacientes.length }} de {{ totalPacientes }} pacientes.
      </p>
      <p v-else>No hay pacientes para mostrar.</p>
    </div>
    <!--Modal-->
    <Modal
      :modalId="modalId"
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="paciente"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEliminarPaciente from '@/components/formularios/eliminar/FormEliminarPaciente.vue'

export default {
  name: 'TablaPacientes',
  props: ['terminoBusqueda'],
  components: {
    Modal,
    FormEliminarPaciente,
  },
  data() {
    return {
      pacientes: [],
      totalPacientes: 0,

      //Modal
      modalId: '',
      modalTitle: '',
      currentComponent: {},
      paciente: {},
      modalId: 'modalId',
    }
  },
  mounted() {
    this.getCantidadPacientes()
    this.actualizarTabla()
  },
  methods: {
    formatDiagnostico(diagnosticos) {
      return diagnosticos.join(', ')
    },
    abrirModal(componente, titulo, paciente) {
      switch (componente) {
        case 'FormEliminarPaciente':
          this.modalId = 'modalEliminarPaciente'
          this.currentComponent = FormEliminarPaciente
          break
        default:
          console.error('Error al abrir el modal: componente no encontrado')
      }
      this.modalTitle = titulo
      this.paciente = paciente
    },
    seleccionarPaciente(pacienteID) {
      this.$router.push('/paciente/' + pacienteID)
    },
    //Obtener cantidad de pacientes
    async getCantidadPacientes() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'pacientes'
        )
        this.totalPacientes = response.data.length
      } catch (error) {
        console.error('Error al obtener la cantidad de pacientes: ', error)
      }
    },
    //Actualizar tabla
    actualizarTabla() {
      axios
        .get(this.$axios.defaults.baseURL + 'pacientes', {
          params: {
            termino: this.terminoBusqueda,
          },
        })
        .then((response) => {
          this.pacientes = response.data.sort((a, b) =>
            a.apellido1.localeCompare(b.apellido1)
          )
          this.$emit('actualizarTabla')
        })
        .catch((error) => {
          console.error('Error al obtener los pacientes: ', error)
        })
    },
    //Filtrar por riesgo
    async filtrarPorRiesgo(riesgo) {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `pacientes/riesgo/`,
          riesgo
        )
        this.pacientes = response.data((a, b) =>
          a.apellido1.localeCompare(b.apellido1)
        )
        this.$emit('actualizarTabla')
      } catch (error) {
        console.error('Error al filtrar por riesgo: ', error.response)
      }
    },
  },
}
</script>
<style scoped>
.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
/*.table th:first-child,
.table td:first-child {
  border-left: none;
}
.table th:last-child,
.table td:last-child {
  border-right: none;
}*/
.table td:nth-child(2),
.table td:nth-child(7),
.table td:nth-child(8) {
  white-space: nowrap;
}
</style>
