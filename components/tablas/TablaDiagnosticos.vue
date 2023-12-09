<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-striped">
      <!--Cabecera de la tabla Diagnósticos-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">#</th>
          <th class="header" scope="col">Código</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Descripción</th>
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Diagnósticos-->
      <tbody>
        <tr v-for="diagnostico in diagnosticos" :key="diagnostico.id">
          <th scope="row">{{ diagnostico.id }}</th>
          <td>{{ diagnostico.codigo }}</td>
          <td>{{ diagnostico.nombre }}</td>
          <td>{{ diagnostico.descripcion }}</td>
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
import Modal from '@/components/modales/Modal.vue'

export default {
  name: 'TablaDiagnosticos',
  components: {
    Modal,
  },
  props: ['terminoBusqueda'],
  data() {
    return {
      diagnosticos: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'diagnosticos/')
      .then((response) => {
        this.diagnosticos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    this.actualizarTabla()
  },
  methods: {
    actualizarTabla() {
      try {
        axios
          .get(
            this.$axios.defaults.baseURL +
              `diagnosticos/?termino=${this.terminoBusqueda}`
          )
          .then((response) => {
            this.diagnosticos = response.data
            this.$emit('actualizarTabla')
          })
      } catch (error) {
        console.log('Error al actualizar la tabla de diagnosticos:', error)
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
