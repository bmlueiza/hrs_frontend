<template>
  <div class="Gestores">
    <Navbar />
    <div class="container">
      <h2 class="text-center">Gestores</h2>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col-md-auto">
          <TablaGestores />
        </div>
        <!--Segunda columna - botones -->
        <div class="buttons-container gap-2 col-md-auto mx-auto">
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
import TablaGestores from '@/components/tablas/TablaGestores.vue'

export default {
  components: {
    Navbar,
    TablaGestores,
  },
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
