<template>
  <div class="FormAgregarMedicamento">
    <form class="agregar-medicamento">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre paciente-->
        <div class="col">
          <p>
            <strong
              >Paciente: {{ datosFormulario.nombres }}
              {{ datosFormulario.apellido1 }} {{ datosFormulario.apellido2 }}
            </strong>
          </p>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - medicamentos actuales del paciente-->
        <div class="col">
          <p>
            <strong>Medicamentos actuales del paciente: </strong
            >{{ formatoMedicamentos(this.medicamentosPaciente) }}
          </p>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna - medicamento-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="medicamento"
            >Agregar medicamento</label
          >
          <multiselect
            id="medicamento"
            v-model="nuevoMedicamento.medicamento"
            :options="posiblesMedicamentos"
            track-by="id"
            label="nombre"
            placeholder="Buscar medicamento"
            :searchable="true"
            :multiple="false"
            :select-label="'Seleccionar'"
            :deselect-label="'Eliminar selección'"
            :selected-label="'Seleccionado'"
          >
          </multiselect>
        </div>
        <!--Segunda columna - medico-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="medico">Médico</label>
          <multiselect
            id="medico"
            v-model="nuevoMedicamento.medico"
            :options="medicos"
            track-by="id"
            label="nombre"
            :custom-label="formatoMedicosLabel"
            placeholder="Buscar médico"
            :searchable="true"
            :multiple="false"
            :select-label="'Seleccionar'"
            :deselect-label="'Eliminar selección'"
            :selected-label="'Seleccionado'"
          ></multiselect>
        </div>
      </div>
      <!--Cuarta fila-->
      <div class="row">
        <!--Primera columna - diagnostico-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="diagnostico"
            >Diagnóstico</label
          >
          <multiselect
            id="diagnostico"
            v-model="nuevoMedicamento.diagnostico"
            :options="diagnosticos"
            track-by="id"
            label="codigo"
            placeholder="Buscar diagnóstico"
            :searchable="true"
            :multiple="false"
            :select-label="'Seleccionar'"
            :deselect-label="'Eliminar selección'"
            :selected-label="'Seleccionado'"
          >
          </multiselect>
        </div>
        <!--Segunda columna - fecha inicio-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="fecha_inicio"
            >Fecha inicio</label
          >
          <input
            class="form-control"
            type="date"
            id="fecha_inicio"
            name="fecha_inicio"
            v-model="nuevoMedicamento.fecha_inicio"
          />
        </div>
      </div>
      <!--Quinta fila-->
      <div class="row">
        <!--Primera columna - fecha término-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="fecha_termino"
            >Fecha término</label
          >
          <input
            class="form-control"
            type="date"
            id="fecha_termino"
            name="fecha_termino"
            v-model="nuevoMedicamento.fecha_termino"
          />
        </div>
        <!--Segunda columna - proximo despacho-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="proximo_despacho"
            >Próximo despacho</label
          >
          <input
            class="form-control"
            type="date"
            id="proximo_despacho"
            name="proximo_despacho"
            v-model="nuevoMedicamento.proximo_despacho"
          />
        </div>
      </div>
      <!--Sexta fila-->
      <div class="row">
        <!--Primera columna - cantidad otorgada-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label" for="cantd_otorgada"
            >Cantidad otorgada</label
          >
          <input
            class="form-control"
            type="text"
            id="cantd_otorgada"
            name="cantd_otorgada"
            v-model="nuevoMedicamento.cantd_otorgada"
            placeholder="Ej: 30 comprimidos"
          />
        </div>
        <!--Segunda columna - indicación de uso-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label" for="indicacion_uso"
            >Indicación de uso</label
          >
          <input
            class="form-control"
            type="text"
            id="indicacion_uso"
            name="indicacion_uso"
            v-model="nuevoMedicamento.indicacion_uso"
            placeholder="Ej: 1 comprimido cada 8 hrs"
            maxlength="100"
          />
        </div>
      </div>
      <!--Séptima fila-->
      <div class="row">
        <!--Primera columna - botones-->
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="agregarMedicamento"
          >
            Agregar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="limpiarFormulario"
          >
            Cancelar
          </button>
        </div>
      </div>
      <div class="avisos text-center">
        <div v-if="mensajeAviso" class="alert alert-success" role="alert">
          {{ mensajeAviso }}
        </div>
        <!-- Aviso de error al agregar paciente -->
        <div v-if="mensajeError" class="alert alert-danger" role="alert">
          {{ mensajeError }}
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
export default {
  name: 'FormAgregarMedicamento',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      medicamentosPaciente: [],
      posiblesMedicamentos: [],
      diagnosticos: [],
      medicos: [],
      nuevoMedicamento: {
        medicamento: '',
        paciente: this.datosFormulario.id,
        fecha_inicio: '',
        fecha_termino: '',
        cantd_otorgada: '',
        indicacion_uso: '',
        proximo_despacho: '',
        estado: 1,
        medico: '',
        diagnostico: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Formato medicamentos
    formatoMedicamentos(medicamentos) {
      if (medicamentos.length == 0) {
        return 'Ninguno.'
      } else {
        return medicamentos.join(', ')
      }
    },
    //Formato medicos label
    formatoMedicosLabel(medico) {
      return `${medico.nombre} ${medico.apellido}`
    },

    //Limpiar formulario
    limpiarFormulario() {
      this.nuevoMedicamento = {
        medicamento: '',
        fecha_inicio: '',
        fecha_termino: '',
        cantd_otorgada: '',
        indicacion_uso: '',
        proximo_despacho: '',
        medico: '',
        diagnostico: '',
      }
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
    //Validar formulario
    validarFormulario() {
      if (this.nuevoMedicamento.medicamento === '') {
        this.mensajeError = 'Debe seleccionar un medicamento'
        return false
      } else if (this.nuevoMedicamento.medico === '') {
        this.mensajeError = 'Debe seleccionar un médico'
        return false
      } else if (this.nuevoMedicamento.diagnostico === '') {
        this.mensajeError = 'Debe seleccionar un diagnóstico'
        return false
      } else if (this.nuevoMedicamento.fecha_inicio === '') {
        this.mensajeError = 'Debe seleccionar una fecha de inicio'
        return false
      } else if (this.nuevoMedicamento.fecha_termino === '') {
        this.mensajeError = 'Debe seleccionar una fecha de término'
        return false
      } else if (this.nuevoMedicamento.proximo_despacho === '') {
        this.mensajeError = 'Debe seleccionar una fecha de próximo despacho'
        return false
      } else {
        return true
      }
    },
    //Obtener medicamentos del paciente
    async getMedicamentosPaciente() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            `historial_medicamentos/paciente/${this.datosFormulario.id}/medicamentos`
        )
        this.medicamentosPaciente = response.data.nombres_medicamentos
      } catch (error) {
        console.log(
          'Error al obtener los medicamentos del paciente',
          error.response
        )
      }
    },
    //Obtener posibles medicamentos
    async getPosiblesMedicamentos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `medicamentos/`
        )
        const medicamentos = response.data
        //Filtrar medicamentos ya asignados
        this.posiblesMedicamentos = medicamentos.filter(
          (medicamento) =>
            !this.medicamentosPaciente.includes(medicamento.nombre)
        )
        if (this.posiblesMedicamentos.length === 0) {
          this.mensajeAviso =
            'No hay medicamentos disponibles para este paciente'
        }
      } catch (error) {
        console.log('Error al obtener los medicamentos', error.response)
      }
    },
    //Obtener diagnosticos
    async getDiagnosticos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `diagnosticos/`
        )
        this.diagnosticos = response.data
        if (this.diagnosticos.length === 0) {
          this.mensajeAviso = 'No se encontraron diagnosticos'
        }
      } catch (error) {
        console.log('Error al obtener los diagnosticos', error.response)
      }
    },
    //Obtener medicos
    async getMedicos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `medicos/`
        )
        this.medicos = response.data
        if (this.medicos.length === 0) {
          this.mensajeAviso = 'No se encontraron medicos'
        }
      } catch (error) {
        console.log('Error al obtener los medicos', error.response)
      }
    },
    //Agregar medicamento al paciente
    async agregarMedicamento() {
      console.log('Medicamento:', this.nuevoMedicamento)
      if (this.validarFormulario()) {
        this.nuevoMedicamento.medicamento = this.nuevoMedicamento.medicamento.id
        this.nuevoMedicamento.medico = this.nuevoMedicamento.medico.id
        this.nuevoMedicamento.diagnostico = this.nuevoMedicamento.diagnostico.id
        console.log('Medicamento:', this.nuevoMedicamento)
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + `historial_medicamentos/`,
            this.nuevoMedicamento,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Medicamento agregado correctamente'
          setTimeout(() => {
            this.$router.push('/paciente/' + this.datosFormulario.id)
          }, 3000)
        } catch (error) {
          console.log('Error al agregar medicamento:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar medicamento'
          setTimeout(() => {
            this.mensajeError = ''
          }, 3000)
        }
      }
    },
  },
  mounted() {
    this.getDiagnosticos()
    this.getMedicos()
    this.getMedicamentosPaciente()
    this.getPosiblesMedicamentos()
  },
}
</script>
