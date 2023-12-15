<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla Historial medicamento-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Estado</th>
          <th class="header" scope="col">Medicamento</th>
          <th class="header" scope="col">Fecha inicio</th>
          <th class="header" scope="col">Fecha término</th>
          <th class="header" scope="col">Médico</th>
          <th class="header" scope="col">Administración</th>
          <th class="header" scope="col">Cantd a entregar</th>
          <th class="header" scope="col">Último retiro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medicamento in medicamentos" :key="medicamentos.id">
          <td>{{ medicamento.estado }}</td>
          <td>{{ medicamento.medicamento }}</td>
          <td>{{ medicamento.fecha_inicio }}</td>
          <td>{{ medicamento.fecha_termino }}</td>
          <td>{{ medicamento.medico }}</td>
          <td>{{ medicamento.administracion }}</td>
          <td>{{ medicamento.cantidad_a_entregar }}</td>
          <td>{{ medicamento.ultimo_retiro }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TablaHistorialMedicamento',
  props: ['pacienteID'],
  data() {
    return {
      medicamentos: [],
    }
  },
  mounted() {
    console.log(this.pacienteID)
    axios
      .get(
        this.$axios.defaults.baseURL +
          `historial_medicamento/paciente/${this.pacienteID}/`
      )
      .then((response) => {
        this.medicamentos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>
