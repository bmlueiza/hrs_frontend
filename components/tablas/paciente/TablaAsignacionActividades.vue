<template>
  <div class="table-responsive">
    <table class="table table-sm tabla-striped table-bordered">
      <!--Cabecera de la tabla Actividades médicas-->
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Actividad</th>
          <th>Estado</th>
          <th>Médico</th>
          <th>Fecha asignación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividad in actividades" :key="actividades.id">
          <td>{{ actividad.fecha_actividad }}</td>
          <td>{{ formatoHora(actividad.hora_actividad) }}</td>
          <td>{{ actividad.actividad_medica }}</td>
          <td>{{ actividad.estado }}</td>
          <td>{{ actividad.medico }}</td>
          <td>{{ actividad.fecha_asignacion }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              :data-bs-target="`#${modalId}`"
              @click="
                abrirModal(
                  'FormEditarAsignacion',
                  'Editar estado de la actividad asignada',
                  actividad
                )
              "
            >
              Editar estado
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal
      :modalId="modalId"
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="actividad"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/modales/Modal.vue'
import FormEditarAsignacion from '@/components/formularios/paciente/FormEditarAsignacion.vue'
export default {
  name: 'TablaAsignacionActividades',
  props: ['pacienteID'],
  components: {
    Modal,
    FormEditarAsignacion,
  },
  data() {
    return {
      actividades: [],
      //Modal
      currentComponent: FormEditarAsignacion,
      modalId: '',
      modalTitle: '',
      actividad: {},
    }
  },
  methods: {
    //Mostrar solo hora y minutos de una hora, sin segundos
    formatoHora(hora) {
      return hora.slice(0, 5)
    },
    async getActividades() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `asignacion_actividades/paciente/${this.pacienteID}/`
        )
        this.actividades = response.data.reverse()
      } catch (error) {
        console.log('Error al obtener las actividades', error)
      }
    },
    abrirModal(componente, titulo, actividad) {
      switch (componente) {
        case 'FormEditarAsignacion':
          this.currentComponent = FormEditarAsignacion
          this.modalId = 'modalEditarAsignacion'
          break
      }
      this.modalTitle = titulo
      this.actividad = actividad
    },
  },
  mounted() {
    this.getActividades()
  },
}
</script>
