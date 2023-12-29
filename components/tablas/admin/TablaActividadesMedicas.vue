<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Actividades médicas-->
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividad in actividades" :key="actividades.id">
          <td>{{ actividad.id }}</td>
          <td>{{ actividad.nombre }}</td>
          <td>{{ actividad.descripcion }}</td>
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
                        'FormEliminarActividadMedica',
                        'Eliminar actividad médica',
                        actividad
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
      :datosFormulario="actividad"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEliminarActividadMedica from '@/components/formularios/eliminar/FormEliminarActividadMedica.vue'

export default {
  name: 'TablaActividadesMedicas',
  components: {
    Modal,
    FormEliminarActividadMedica,
  },
  data() {
    return {
      actividades: [],
      //Modal
      modalId: '',
      modalTitle: '',
      currentComponent: {},
      actividad: {},
    }
  },
  mounted() {
    this.getActividadesMedicas()
  },
  methods: {
    abrirModal(componente, titulo, actividad) {
      switch (componente) {
        case 'FormEliminarActividadMedica':
          this.modalId = 'modalEliminarActividadMedica'
          this.currentComponent = FormEliminarActividadMedica
          break
        default:
          console.error('Error al seleccionar el componente del modal')
      }
      this.modalTitle = titulo
      this.actividad = actividad
    },
    async getActividadesMedicas() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `actividades_medicas/`
        )
        this.actividades = response.data
      } catch (error) {
        console.log('Error al obtener las actividades médicas:', error)
      }
    },
  },
}
</script>
