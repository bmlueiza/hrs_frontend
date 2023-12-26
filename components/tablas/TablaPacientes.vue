<template>
  <div>
    <div class="table-responsive">
      <table class="table table-sm table-hover table-striped table-bordered">
        <!--Cabecera de la tabla Pacientes-->
        <thead>
          <tr>
            <th></th>
            <th>RUT</th>
            <th>Nombres</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th>Riesgo</th>
            <th>Diagnóstico</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th v-if="usuario.admin">Gestor</th>
            <th v-if="usuario.admin"></th>
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
            <td v-if="usuario.admin">{{ paciente.gestor }}</td>
            <td v-if="usuario.admin">
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
  props: ['terminoBusqueda', 'usuario'],
  components: {
    Modal,
    FormEliminarPaciente,
  },
  data() {
    return {
      gestor: '',
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
    this.cargarGestor()
    this.getCantidadPacientes()
    this.actualizarTabla()
  },
  methods: {
    async cargarGestor() {
      try {
        const gestorInfoString = localStorage.getItem('gestor')

        if (gestorInfoString) {
          this.gestor = JSON.parse(gestorInfoString)
        }
      } catch (error) {
        console.log('Error al cargar el gestor', error)
      }
    },
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
      if (this.gestor.admin) {
        try {
          const response = await axios.get(
            this.$axios.defaults.baseURL + 'pacientes'
          )
          this.totalPacientes = response.data.length
        } catch (error) {
          console.error('Error al obtener la cantidad de pacientes: ', error)
        }
      } else {
        try {
          const response = await axios.get(
            this.$axios.defaults.baseURL + 'pacientes/gestor/' + this.gestor.id
          )
          this.totalPacientes = response.data.length
        } catch (error) {
          console.error('Error al obtener la cantidad de pacientes: ', error)
        }
      }
    },
    //Actualizar tabla
    actualizarTabla() {
      console.log('Admin: ', this.gestor.admin)
      if (this.gestor.admin) {
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
      } else {
        this.getPacientesPorGestor()
      }
    },
    async getPacientesPorGestor() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'pacientes/gestor/' + this.gestor.id,
          {
            params: {
              termino: this.terminoBusqueda,
            },
          }
        )
        this.pacientes = response.data.sort((a, b) =>
          a.apellido1.localeCompare(b.apellido1)
        )
      } catch (error) {
        console.error('Error al obtener los pacientes de este gestor: ', error)
      }
    },
    async getTodosLosPacientes() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'pacientes',
          {
            params: {
              termino: this.terminoBusqueda,
            },
          }
        )
        this.pacientes = response.data.sort((a, b) =>
          a.apellido1.localeCompare(b.apellido1)
        )
      } catch (error) {
        console.error('Error al obtener los pacientes: ', error)
      }
    },
  },
}
</script>
<style scoped>
.table td:nth-child(2),
.table td:nth-child(7),
.table td:nth-child(8) {
  white-space: nowrap;
}
</style>
