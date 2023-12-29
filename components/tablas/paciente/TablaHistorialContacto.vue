<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla historial de contacto-->
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acción</th>
          <th>Motivo</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contacto in contactos" :key="contactos.id">
          <td>{{ contacto.fecha }}</td>
          <td>{{ contacto.hora }}</td>
          <td>{{ contacto.accion_gestor }}</td>
          <td>{{ contacto.motivo }}</td>
          <td>{{ contacto.resultado_contacto }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaHistorialContacto',
  props: ['pacienteID'],
  data() {
    return {
      contactos: [],
    }
  },
  mounted() {
    this.getContactos()
  },
  methods: {
    async getContactos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `historial_contactos/paciente/${this.pacienteID}/`
        )
        this.contactos = response.data.reverse()
      } catch (error) {
        console.log('Error al obtener los contactos', error)
      }
    },
  },
}
</script>
