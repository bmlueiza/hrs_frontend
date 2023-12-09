<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped table-bordered">
      <!--Cabecera de la tabla Acciones de un gestor-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">ID</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Estado</th>
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="accion in acciones" :key="acciones.id">
          <td>{{ accion.id }}</td>
          <td>{{ accion.nombre }}</td>
          <td>{{ accion.estado }}</td>
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
  name: 'TablaAccionesGestor',
  data() {
    return {
      acciones: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `acciones_gestor/`)
      .then((response) => {
        this.acciones = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
