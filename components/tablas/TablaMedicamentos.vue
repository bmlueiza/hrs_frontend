<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Medicamentos-->
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th v-if="usuario.admin"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Medicamentos-->
      <tbody>
        <tr v-for="medicamento in medicamentos" :key="medicamento.id">
          <th scope="row">{{ medicamento.id }}</th>
          <td>{{ medicamento.nombre }}</td>
          <td>{{ medicamento.descripcion }}</td>
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
                        'FormEliminarMedicamento',
                        'Eliminar medicamento',
                        medicamento
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
      :datosFormulario="medicamento"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEliminarMedicamento from '@/components/formularios/eliminar/FormEliminarMedicamento.vue'

export default {
  name: 'TablaMedicamentos',
  props: ['terminoBusqueda', 'usuario'],
  components: {
    Modal,
    FormEliminarMedicamento,
  },
  data() {
    return {
      medicamentos: [],
      // Modal
      modalId: '',
      modalTitle: '',
      currentComponent: {},
      medicamento: {},
    }
  },
  mounted() {
    this.actualizarTabla()
  },
  methods: {
    abrirModal(componente, titulo, medicamento) {
      switch (componente) {
        case 'FormEliminarMedicamento':
          this.modalId = 'modalEliminarMedicamento'
          this.currentComponent = FormEliminarMedicamento
          break
        default:
          console.error('Error al seleccionar el componente del modal')
      }
      this.modalTitle = titulo
      this.medicamento = medicamento
    },
    actualizarTabla() {
      try {
        axios
          .get(
            this.$axios.defaults.baseURL +
              `medicamentos/?termino=${this.terminoBusqueda}`
          )
          .then((response) => {
            this.medicamentos = response.data
            this.$emit('actualizarTabla')
          })
      } catch (error) {
        console.log('Error al actualizar la tabla de medicamentos:', error)
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
</style>
