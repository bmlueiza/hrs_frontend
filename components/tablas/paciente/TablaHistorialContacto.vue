<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla historial de contacto-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Fecha</th>
          <th class="header" scope="col">Acción</th>
          <th class="header" scope="col">Motivo</th>
          <th class="header" scope="col">Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contacto in contactos" :key="contactos.id">
          <td>{{ contacto.fecha }}</td>
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
    console.log(this.pacienteID)
    axios
      .get(
        this.$axios.defaults.baseURL +
          `historiales_contacto/paciente/${this.pacienteID}/`
      )
      .then((response) => {
        this.contactos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
