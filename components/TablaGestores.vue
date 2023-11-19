<template>
  <div class="table-responsive">
    <table class="table table-light table-striped table-bordered">
      <!--Cabecera de la tabla Gestores-->
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Apellido</th>
          <th>Correo</th>
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
