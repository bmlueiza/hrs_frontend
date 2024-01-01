<template>
  <div>
    <!--Aviso normal-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="editar-medicamento">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre paciente-->
        <div class="col">
          <p>
            <strong>Paciente: {{ datosFormulario.paciente }} </strong>
          </p>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - nombre medicamento-->
        <div class="col">
          <p>
            <strong>Medicamento: {{ datosFormulario.medicamento }}</strong>
          </p>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna - nombre medicamento-->
        <div class="col">
          <p>
            <strong>INFO: </strong>Si solo quiere actualizar el estado, no es
            necesario que seleccione una fecha de próximo despacho.
          </p>
        </div>
      </div>
      <!--Cuarta fila-->
      <div class="row">
        <!--Primera columna - estado-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label required" for="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              class="form-select"
              v-model="medicamento.estado"
            >
              <option
                v-for="estado in estados"
                :key="estado[0]"
                :value="estado[0]"
              >
                {{ estado[1] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!--Quinta fila-->
      <div class="row">
        <!--Primera columna - próximo despacho-->
        <div class="col mt-1">
          <label class="form-label" for="proximo_despacho"
            >Próximo despacho</label
          >
          <input
            type="date"
            id="proximo_despacho"
            name="proximo_despacho"
            class="form-control"
            autocomplete="off"
            v-model="medicamento.proximo_despacho"
          />
        </div>
      </div>
      <!--Sexta fila-->
      <div class="row">
        <!--Primera columna - botón guardar-->
        <div class="col mt-3 text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="editarMedicamento"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormEditarMedicamento',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      estados: [],
      mensajeAviso: '',
      mensajeError: '',
      medicamento: {
        proximo_despacho: this.datosFormulario.proximo_despacho,
        estado: this.datosFormulario.estado,
      },
    }
  },
  methods: {
    async editarMedicamento() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.patch(
            this.$axios.defaults.baseURL +
              `seguimiento_medicamentos/${this.datosFormulario.id}/`,
            {
              estado: this.medicamento.estado,
              proximo_despacho: this.medicamento.proximo_despacho,
            }
          )
          this.mensajeAviso = 'Medicamento editado correctamente'
          this.mensajeError = ''
          setTimeout(() => {
            this.mensaje = ''
            window.location.reload()
          }, 2100)
        } catch (error) {
          this.mensajeAviso = ''
          this.mensajeError = 'Error al editar el medicamento'
        }
      }
    },
    async getEstados() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'seguimiento_medicamentos/estados'
        )
        this.estados = response.data
      } catch (error) {
        console.log('Error al obtener los estados de los medicamentos', error)
      }
    },
    validarFormulario() {
      if (this.medicamento.estado === '') {
        this.mensajeError = 'Debe seleccionar un estado'
        console.log('Datos del formulario:', this.datosFormulario)
        return false
      }
      if (this.medicamento.proximo_despacho === '') {
        this.mensajeError = 'Debe seleccionar una fecha de próximo despacho'
        return false
      }
      return true
    },
  },
  mounted() {
    this.getEstados()
  },
}
</script>
