<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Diagnósticos-->
      <thead>
        <tr>
          <th>#</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th v-if="gestorInfo.admin"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Diagnósticos-->
      <tbody>
        <tr v-for="diagnostico in diagnosticos" :key="diagnostico.id">
          <th scope="row">{{ diagnostico.id }}</th>
          <td>{{ diagnostico.codigo }}</td>
          <td>{{ diagnostico.nombre }}</td>
          <td>{{ diagnostico.descripcion }}</td>
          <td v-if="gestorInfo.admin">
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
  props: ['terminoBusqueda', 'gestorInfo'],
  data() {
    return {
      //Gestores
      gestorID: '',
      //Diagnosticos
      diagnosticos: [],
    }
  },
  mounted() {
    this.actualizarTabla()
  },
  methods: {
    cargarGestor() {
      try {
        const gestorInfoString = localStorage.getItem('gestor')

        if (gestorInfoString) {
          this.gestorInfo = JSON.parse(gestorInfoString)
          this.gestorID = JSON.parse(gestorInfoString).id
        }
      } catch (error) {
        console.log('Error al cargar el gestor', error)
      }
    },
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
