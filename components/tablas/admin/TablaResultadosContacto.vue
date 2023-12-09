<template>
  <div class="table-responsive">
    <table class="table table-sm table-condensed table-striped table-bordered">
      <!--Cabecera de la tabla Resultados de contacto-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">ID</th>
          <th class="header" scope="col">Nombre</th>
          <th class="header" scope="col">Descripción</th>
          <th class="header" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="resultado in resultados" :key="resultados.id">
          <td>{{ resultado.id }}</td>
          <td>{{ resultado.nombre }}</td>
          <td>{{ resultado.descripcion }}</td>
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
  name: 'TablaResultadosContacto',
  data() {
    return {
      resultados: [],
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `resultados_contacto/`)
      .then((response) => {
        this.resultados = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
