<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-striped">
      <!--Cabecera de la tabla Gestores-->
      <thead class="sticky-header">
        <tr>
          <th class="header" scope="col">RUT</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Apellido</th>
          <th class="header" scope="col">Teléfono</th>
          <th class="header" scope="col">Correo</th>
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Gestores-->
      <tbody>
        <tr v-for="gestor in gestores" :key="gestor.id">
          <td>{{ gestor.rut }}</td>
          <td>{{ gestor.nombre }}</td>
          <td>{{ gestor.apellido }}</td>
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
                  <button
                    type="button"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    :data-bs-target="`#${modalId}`"
                  >
                    Editar
                  </button>
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
import FormEditarGestor from '@/components/formularios/FormEditarGestor.vue'
import FormEliminarGestor from '@/components/formularios/eliminar/FormEliminarGestor.vue'

export default {
  name: 'TablaGestores',
  components: {
    Modal,
    FormEditarGestor,
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
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'gestores')
      .then((response) => {
        this.gestores = response.data
        this.totalGestores = this.gestores.length
      })
      .catch((error) => {
        console.log('Error al obtener los datos de gestores de casos:', error)
      })
    this.actualizarTabla()
  },
  methods: {
    abrirModal(componente, titulo, gestor) {
      switch (componente) {
        case 'FormEditarGestor':
          this.modalId = 'modalId2'
          this.currentComponent = FormEditarGestor
          break
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
