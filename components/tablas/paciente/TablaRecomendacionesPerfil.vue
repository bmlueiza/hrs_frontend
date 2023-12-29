<template>
  <div>
    <div class="table-responsive">
      <table
        class="table table-light table-sm table-striped table-bordered table-hover"
      >
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recomendacion in recomendaciones" :key="recomendacion.id">
            <td>{{ recomendacion.accion_gestor }}</td>
            <td>{{ recomendacion.motivo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaRecomendacionesPerfil',
  props: ['pacienteID'],
  data() {
    return {
      recomendaciones: [],
    }
  },
  methods: {
    async getRecomendaciones() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `recomendaciones/paciente/${this.pacienteID}/`
        )
        this.recomendaciones = response.data.recomendaciones
      } catch (error) {
        console.log('Error al obtener las recomendaciones', error)
      }
    },
  },
  mounted() {
    this.getRecomendaciones()
  },
}
</script>
