<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-striped">
      <!--Cabecera de la tabla Gestores-->
      <thead class="sticky-header">
        <tr>
          <th>Usuario</th>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Gestores-->
      <tbody>
        <tr v-for="gestor in gestores" :key="gestor.id">
          <td>{{ gestor.username }}</td>
          <td>{{ gestor.rut }}</td>
          <td>{{ gestor.first_name }}</td>
          <td>{{ gestor.last_name }}</td>
          <td>{{ gestor.telefono }}</td>
          <td>{{ gestor.email }}</td>
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
                        'FormEliminarGestor',
                        'Eliminar gestor',
                        gestor
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
    <div class="text-center mt-3">
      <p v-if="gestores.length > 0">
        Mostrando {{ gestores.length }} de {{ totalGestores }} gestores.
      </p>
      <p v-else>No hay gestores para mostrar.</p>
    </div>
    <Modal
      :modalId="modalId"
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="gestor"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEliminarGestor from '@/components/formularios/eliminar/FormEliminarGestor.vue'

export default {
  name: 'TablaGestores',
  components: {
    Modal,
    FormEliminarGestor,
  },
  props: ['terminoBusqueda'],
  data() {
    return {
      gestores: [],
      totalGestores: 0,
      //Modal
      modalId: '',
      modalTitle: '',
      currentComponent: {},
      gestor: {},
      gestorLocal: {},
    }
  },
  mounted() {
    this.getCantidadGestores()
    this.actualizarTabla()
  },
  methods: {
    async getCantidadGestores() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'gestores'
        )
        this.totalGestores = response.data.length
      } catch (error) {
        console.log('Error al obtener la cantidad de gestores de casos:', error)
      }
    },
    abrirModal(componente, titulo, gestor) {
      switch (componente) {
        case 'FormEliminarGestor':
          this.modalId = 'modalEliminarGestor'
          this.currentComponent = FormEliminarGestor
          break
        default:
          console.error('Error al abrir el modal: componente no encontrado')
      }
      this.modalTitle = titulo
      this.gestor = gestor
    },
    actualizarTabla() {
      try {
        axios
          .get(
            this.$axios.defaults.baseURL +
              `gestores/?termino=${this.terminoBusqueda}`
          )
          .then((response) => {
            this.gestores = response.data
            this.$emit('actualizarTabla')
          })
      } catch (error) {
        console.log('Error al actualizar la tabla de gestores:', error)
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
