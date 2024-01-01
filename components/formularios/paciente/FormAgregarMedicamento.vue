<template>
  <div class="FormAgregarMedicamento">
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar paciente -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
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
            <strong
              >Medicamentos actuales del paciente:
              {{ formatoMedicamentos(this.medicamentosPaciente) }}</strong
            >
          </p>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna - medicamento-->
        <div class="form-group col-12 col-md-4 col-lg-4 mb-2">
          <label class="form-label required" for="medicamento"
            >Medicamento</label
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
        <!--Segunda columna - especialidad-->
        <div class="form-group col-12 col-md-4 col-lg-4 mb-2">
          <label class="form-label required" for="especialidad"
            >Especialidad</label
          >
          <select
            class="form-select"
            id="especialidad"
            name="especialidad"
            v-model="especialidadSeleccionada"
            @change="cambioEspecialidad"
          >
            <option
              v-for="especialidad in especialidades"
              :key="especialidad.id"
              :value="especialidad.id"
            >
              {{ especialidad.nombre }}
            </option>
          </select>
        </div>
        <!--Tercera columna - medico-->
        <div class="form-group col-12 col-md-4 col-lg-4 mb-2">
          <label class="form-label required" for="medico">Médico</label>
          <select
            class="form-select"
            id="medico"
            name="medico"
            v-model="nuevoMedicamento.medico"
          >
            <option
              v-for="medico in medicos"
              :key="medico.id"
              :value="medico.id"
            >
              {{ medico.nombre }} {{ medico.apellido }}
            </option>
          </select>
        </div>
      </div>
      <!--Cuarta fila-->
      <div class="row">
        <!--Primera columna - diagnostico-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="diagnostico"
            >Diagnóstico</label
          >
          <select
            class="form-select"
            id="diagnostico"
            name="diagnostico"
            v-model="nuevoMedicamento.diagnostico"
          >
            <option
              v-for="diagnostico in diagnosticos"
              :key="diagnostico"
              :value="diagnostico"
            >
              {{ diagnostico }}
            </option>
          </select>
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
            :max="fechaActual"
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
            :min="fechaActual"
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
            :min="fechaActual"
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
            autocomplete="off"
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
            autocomplete="off"
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
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
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
    vSelect,
  },
  data() {
    return {
      fechaActual: new Date().toISOString().slice(0, 10),
      medicamentosPaciente: [],
      posiblesMedicamentos: [],
      diagnosticos: this.datosFormulario.diagnosticos,
      todosLosDiagnosticos: [],
      especialidades: [],
      especialidadSeleccionada: '',
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
      console.log('Diagnostico: ', this.nuevoMedicamento.diagnostico)
      console.log('Medico: ', this.nuevoMedicamento.medico)
      console.log('Medicamento: ', this.nuevoMedicamento.medicamento)
      this.nuevoMedicamento = {
        medicamento: '',
        fecha_inicio: '',
        fecha_termino: '',
        cantd_otorgada: '',
        indicacion_uso: '',
        proximo_despacho: '',
        especialidad: '',
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
      } else if (this.nuevoMedicamento.fecha_inicio > this.fechaActual) {
        this.mensajeError =
          'La fecha de inicio no puede ser posterior a la fecha actual'
        return false
      } else if (this.nuevoMedicamento.fecha_termino === '') {
        this.mensajeError = 'Debe seleccionar una fecha de término'
        return false
      } else if (this.nuevoMedicamento.fecha_termino < this.fechaActual) {
        this.mensajeError =
          'La fecha de término no puede ser anterior a la fecha actual'
        return false
      } else if (this.nuevoMedicamento.proximo_despacho === '') {
        this.mensajeError = 'Debe seleccionar una fecha de próximo despacho'
        return false
      } else if (this.nuevoMedicamento.proximo_despacho < this.fechaActual) {
        this.mensajeError =
          'La fecha de próximo despacho no puede ser anterior a la fecha actual'
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
            `seguimiento_medicamentos/paciente/${this.datosFormulario.id}/medicamentos`
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
    //Obtener todos los diagnosticos
    async getTodosLosDiagnosticos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `diagnosticos/`
        )
        this.todosLosDiagnosticos = response.data
      } catch (error) {
        console.log('Error al obtener los diagnosticos', error.response)
      }
    },
    //Obtener id del diagnostico
    getIdDiagnostico() {
      const diagnostico = this.todosLosDiagnosticos.find(
        (diagnostico) =>
          diagnostico.codigo === this.nuevoMedicamento.diagnostico
      )
      return diagnostico.id
    },
    //Obtener especialidades
    async getEspecialidades() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'especialidades_medicas/'
        )
        this.especialidades = response.data
      } catch (error) {
        console.log(error)
      }
    },
    //Cambio de especialidad
    async cambioEspecialidad() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL +
            'medicos/especialidad/' +
            this.especialidadSeleccionada
        )
        this.medicos = response.data
      } catch (error) {
        console.log(error)
      }
    },
    //Agregar medicamento al paciente
    async agregarMedicamento() {
      if (this.validarFormulario()) {
        this.nuevoMedicamento.medicamento = this.nuevoMedicamento.medicamento.id
        this.nuevoMedicamento.diagnostico = this.getIdDiagnostico()
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + `seguimiento_medicamentos/`,
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
            this.mensajeAviso = ''
            window.location.reload()
          }, 2000)
        } catch (error) {
          console.log('Error al agregar medicamento:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar medicamento'
          setTimeout(() => {
            this.mensajeError = ''
          }, 2000)
        }
      }
    },
  },
  mounted() {
    this.getTodosLosDiagnosticos()
    this.getMedicamentosPaciente()
    this.getPosiblesMedicamentos()
    this.getEspecialidades()
  },
}
</script>
