<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla Historial medicamento-->
      <thead class="table-light">
        <tr>
          <th class="header" scope="col">Medicamento</th>
          <th class="header" scope="col">Estado</th>
          <th class="header" scope="col">Próximo despacho</th>
          <th class="header" scope="col">Médico</th>
          <th class="header" scope="col">Diágnostico</th>
          <th class="header" scope="col">Indicaciones</th>
          <th class="header" scope="col">Cantd. despacho</th>
          <th class="header" scope="col">Fecha inicio</th>
          <th class="header" scope="col">Fecha término</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medicamento in medicamentos" :key="medicamentos.id">
          <td>{{ medicamento.medicamento }}</td>
          <td>{{ medicamento.estado }}</td>
          <td>{{ medicamento.proximo_despacho }}</td>
          <td>{{ medicamento.medico }}</td>
          <td>{{ medicamento.diagnostico }}</td>
          <td>{{ medicamento.indicacion_uso }}</td>
          <td>{{ medicamento.cantd_otorgada }}</td>
          <td>{{ medicamento.fecha_inicio }}</td>
          <td>{{ medicamento.fecha_termino }}</td>
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
          `historial_medicamentos/paciente/${this.pacienteID}/`
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
