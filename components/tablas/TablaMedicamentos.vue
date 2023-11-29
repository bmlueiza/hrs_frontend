<template>
  <div class="table-responsive">
    <table class="table table-condensed table-hover table-striped">
      <!--Cabecera de la tabla Medicamentos-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Código</th>
          <th class="header" scope="col">Descripción</th>
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Medicamentos-->
      <tbody>
        <tr v-for="medicamento in medicamentos" :key="medicamento.id">
          <td>{{ medicamento.nombre }}</td>
          <td>{{ medicamento.codigo }}</td>
          <td>{{ medicamento.descripcion }}</td>
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

export default {
  name: 'TablaMedicamentos',
  props: ['terminoBusqueda'],
  data() {
    return {
      medicamentos: [],
    }
  },
  mounted() {
    try {
      axios
        .get(this.$axios.defaults.baseURL + 'medicamentos/')
        .then((response) => {
          this.medicamentos = response.data
        })
    } catch (error) {
      console.log(error)
    }
    this.actualizarTabla()
  },
  methods: {
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
<style>
.header {
  position: sticky;
  top: 0;
}
</style>
<style scoped>
.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
</style>
