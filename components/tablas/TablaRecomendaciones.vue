<template>
  <div>
    <div class="table-responsive">
      <table class="table table-hover table-light table-striped">
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Paciente</th>
            <th>Motivo</th>
            <th>Fecha de la asignación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recomendacion in recomendaciones" :key="recomendacion.id">
            <td>{{ recomendacion.accion_gestor }}</td>
            <td>{{ recomendacion.paciente }}</td>
            <td>{{ recomendacion.motivo }}</td>
            <td>{{ recomendacion.fecha_asignacion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-3">
      <p v-if="recomendaciones.length > 0">
        Mostrando {{ recomendaciones.length }} de
        {{ totalRecomendaciones }} recomendaciones.
      </p>
      <p v-else>No hay recomendaciones por mostrar.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaRecomendaciones',
  data() {
    return {
      recomendaciones: [],
      totalRecomendaciones: 0,
      gestorInfo: '',
      gestorID: '',
    }
  },
  methods: {
    async getRecomendaciones() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `recomendaciones/gestor/${this.gestorID}/`
        )
        this.recomendaciones = response.data.recomendaciones
        this.totalRecomendaciones = this.recomendaciones.length
      } catch (error) {
        console.log('Error al obtener las recomendaciones', error)
      }
    },
  },
  mounted() {
    try {
      this.gestorInfo = localStorage.getItem('gestor')
      this.gestorID = JSON.parse(this.gestorInfo).id
      this.getRecomendaciones()
    } catch (error) {
      console.log('Error al obtener el ID del gestor', error)
    }
  },
}
</script>
