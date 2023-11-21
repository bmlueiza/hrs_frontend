<template>
  <div class="table-responsive">
    <table class="table table-condensed table-hover table-striped">
      <!--Cabecera de la tabla Gestores-->
      <thead class="table-light">
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Gestores-->
      <tbody>
        <tr v-for="gestor in todosLosGestores" :key="gestor.id">
          <td>{{ gestor.rut }}</td>
          <td>{{ gestor.nombre }}</td>
          <td>{{ gestor.telefono }}</td>
          <td>{{ gestor.apellido }}</td>
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
  name: 'TablaGestores',
  data() {
    return {
      todosLosGestores: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/gestores/')
      .then((response) => {
        this.todosLosGestores = response.data
      })
      .catch((error) => {
        console.log('Error al obtener los datos de gestores de casos:', error)
      })
  },
}
</script>
