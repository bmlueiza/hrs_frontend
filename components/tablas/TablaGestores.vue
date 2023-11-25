<template>
  <div class="table-responsive">
    <table class="table table-condensed table-hover table-striped">
      <!--Cabecera de la tabla Gestores-->
      <thead class="table-light">
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th></th>
        </tr>
      </thead>
      <!--Contenido de la tabla Gestores-->
      <tbody>
        <tr v-for="gestor in gestores" :key="gestor.id">
          <td>{{ gestor.rut }}</td>
          <td>{{ gestor.nombre }}</td>
          <td>{{ gestor.apellido }}</td>
          <td>{{ gestor.telefono }}</td>
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
    <div class="text-center mt-3">
      <p v-if="gestores.length > 0">
        Mostrando {{ gestores.length }} de {{ totalGestores }} gestores.
      </p>
      <p v-else>No hay gestores para mostrar.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TablaGestores',
  props: ['terminoBusqueda'],
  data() {
    return {
      gestores: [],
      totalGestores: 0,
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'gestores')
      .then((response) => {
        this.gestores = response.data
        this.totalGestores = this.gestores.length
      })
      .catch((error) => {
        console.log('Error al obtener los datos de gestores de casos:', error)
      })
    this.actualizarTabla()
  },
  methods: {
    actualizarTabla() {
      try {
        axios
          .get(
            this.$axios.defaults.baseURL +
              `gestores/?termino=${this.terminoBusqueda}`
          )
          .then((response) => {
            this.gestores = response.data
            this.$emit('actualizarTabla')
          })
      } catch (error) {
        console.log('Error al actualizar la tabla de gestores:', error)
      }
    },
  },
}
</script>
