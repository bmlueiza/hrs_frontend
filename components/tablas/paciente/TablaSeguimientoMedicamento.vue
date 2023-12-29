<template>
  <div class="table-responsive">
    <table
      class="table table-light table-sm table-striped table-bordered table-hover"
    >
      <!--Cabecera de la tabla Historial medicamento-->
      <thead>
        <tr>
          <th>Medicamento</th>
          <th>Estado</th>
          <th>Próximo despacho</th>
          <th>Médico</th>
          <th>Diágnostico</th>
          <th>Indicaciones</th>
          <th>Cantd. despacho</th>
          <th>Fecha inicio</th>
          <th>Fecha término</th>
          <th></th>
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
          <td>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              :data-bs-target="`#${modalId}`"
              @click="
                abrirModal(
                  'FormEditarMedicamento',
                  'Editar estado y fecha del próximo despacho',
                  medicamento
                )
              "
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal
      :modalId="modalId"
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="medicamento"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEditarMedicamento from '@/components/formularios/paciente/FormEditarMedicamento.vue'
export default {
  name: 'TablaSeguimientoMedicamento',
  props: ['pacienteID'],
  components: {
    Modal,
    FormEditarMedicamento,
  },
  data() {
    return {
      medicamentos: [],
      //Modal
      currentComponent: FormEditarMedicamento,
      modalId: '',
      modalTitle: '',
      medicamento: {},
    }
  },
  mounted() {
    this.getMedicamentos()
  },
  methods: {
    async getMedicamentos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `seguimiento_medicamentos/paciente/${this.pacienteID}/`
        )
        this.medicamentos = response.data
      } catch (error) {
        console.log('Error al obtener los medicamentos', error)
      }
    },
    abrirModal(componente, titulo, medicamento) {
      switch (componente) {
        case 'FormEditarMedicamento':
          this.modalId = 'modalId2'
          this.currentComponente = FormEditarMedicamento
          break
      }
      this.modalTitle = titulo
      this.medicamento = medicamento
    },
  },
}
</script>
