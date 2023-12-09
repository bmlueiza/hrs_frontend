<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-striped">
      <!--Cabecera de la tabla Gestores-->
      <thead class="table-light">
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
                  <a
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    :data-bs-target="`#${modalId}`"
                    @click.prevent="cargarDatos(gestor.id)"
                  >
                    Editar
                  </a>
                </li>
                <Modal
                  ref="modal"
                  :modalId="modalId"
                  :modalTitle="modalTitle"
                  :componenteFormulario="componenteFormulario"
                  :mostrarModal="mostrarModal"
                  :gestorId="gestorId"
                />
                <li><a class="dropdown-item" href="#">Eliminar</a></li>
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
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEditarGestor from '@/components/formularios/FormEditarGestor.vue'

export default {
  name: 'TablaGestores',
  components: {
    Modal,
    FormEditarGestor,
  },
  props: ['terminoBusqueda'],
  data() {
    return {
      gestores: [],
      totalGestores: 0,
      mostrarModal: false,
      modalId: 'modalId',
      modalTitle: 'Editar información gestor',
      componenteFormulario: FormEditarGestor,
      gestorId: null,
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
    cargarDatos(id) {
      gestorId = this.gestorId
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
