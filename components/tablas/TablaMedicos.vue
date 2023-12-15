<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-striped">
      <!--Cabecera de la tabla Médicos-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">#</th>
          <th class="header" scope="col">RUT</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Apellido</th>
          <th class="header" scope="col">Especialidad</th>
          <th class="header" scope="col"></th>
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
  name: 'TablaMedicos',
  components: {
    Modal,
  },
  props: ['terminoBusqueda'],
  data() {
    return {
      medicos: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'medicos/')
      .then((response) => {
        this.medicos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
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
