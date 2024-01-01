<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Médicos-->
      <thead>
        <tr>
          <th>#</th>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Especialidad</th>
          <th v-if="usuario.admin"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Médicos-->
      <tbody>
        <tr v-for="medico in medicos" :key="medico.id">
          <th scope="row">{{ medico.id }}</th>
          <td>{{ medico.rut }}</td>
          <td>{{ medico.nombre }}</td>
          <td>{{ medico.apellido }}</td>
          <td>{{ medico.especialidad }}</td>
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
                <li>
                  <button type="button" class="dropdown-item">Editar</button>
                </li>
                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    :data-bs-target="`#${modalId}`"
                    @click="
                      abrirModal(
                        'FormEliminarMedico',
                        'Eliminar medico',
                        medico
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
    <Modal
      :modalId="modalId"
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="medico"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEliminarMedico from '@/components/formularios/eliminar/FormEliminarMedico.vue'

export default {
  name: 'TablaMedicos',
  components: {
    Modal,
    FormEliminarMedico,
  },
  props: ['terminoBusqueda', 'usuario'],
  data() {
    return {
      medicos: [],
      // Modal
      modalId: '',
      modalTitle: '',
      currentComponent: {},
      medico: {},
    }
  },
  mounted() {
    this.actualizarTabla()
  },
  methods: {
    actualizarTabla() {
      axios
        .get(
          this.$axios.defaults.baseURL +
            `medicos/?termino=${this.terminoBusqueda}`
        )
        .then((response) => {
          this.medicos = response.data
          this.$emit('actualizarTabla')
        })
        .catch((error) => {
          console.log('Error al actualizar la tabla de medicos', error)
        })
    },
    abrirModal(componente, titulo, medico) {
      switch (componente) {
        case 'FormEliminarMedico':
          this.modalId = 'modalEliminarMedico'
          this.currentComponent = FormEliminarMedico
          break
        default:
          console.error('Error al abrir el modal: componente no encontrado')
      }
      this.modalTitle = titulo
      this.medico = medico
    },
  },
}
</script>
<style scoped>
.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
</style>
