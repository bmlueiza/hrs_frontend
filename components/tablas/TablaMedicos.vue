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
  name: 'TablaMedicos',
  components: {
    Modal,
  },
  props: ['terminoBusqueda', 'usuario'],
  data() {
    return {
      medicos: [],
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
  },
}
</script>
<style scoped>
.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
</style>
