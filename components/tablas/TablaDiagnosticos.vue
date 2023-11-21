<template>
  <div class="table-responsive">
    <table class="table table-condensed table-hover table-striped">
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
        <tr v-for="diagnostico in todosLosDiagnosticos" :key="diagnostico.id">
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

export default {
  data() {
    return {
      todosLosDiagnosticos: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/diagnosticos')
      .then((response) => {
        this.todosLosDiagnosticos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
