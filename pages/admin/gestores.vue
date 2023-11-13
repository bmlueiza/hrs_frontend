<template>
  <div class="Gestores">
    <Navbar />
    <div class="container">
      <h2 class="text-center">Gestores</h2>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="table-responsive">
            <table class="table table-light table-striped table-bordered">
              <!--Cabecera de la tabla Gestores-->
              <thead>
                <tr>
                  <th>RUT</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <!--Contenido de la tabla Gestores-->
              <tbody>
                <tr v-for="gestor in todosLosGestores" :key="gestor.id">
                  <td>{{ gestor.rut }}</td>
                  <td>{{ gestor.nombre }}</td>
                  <td>{{ gestor.apellido }}</td>
                  <td>{{ gestor.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--Segunda columna - botones -->
        <div class="buttons-container d-grid gap-2 col mx-auto">
          <button @click="irANuevoGestor" type="button" class="btn btn-primary">
            Añadir gestor
          </button>
          <button type="button" class="btn btn-primary">
            Actualizar gestor
          </button>
          <button type="button" class="btn btn-primary">Eliminar gestor</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'

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
  methods: {
    irANuevoGestor() {
      this.$router.push('/admin/nuevoGestor')
    },
  },
}
</script>
<style></style>
