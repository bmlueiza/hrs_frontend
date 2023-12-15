<template>
  <div class="form-contacto">
    <div class="row">
      <div class="col mx-auto">
        <!--Aviso de contacto agregado correctamente-->
        <div class="avisos text-center">
          <div v-if="mensajeAviso" class="alert alert-success" role="alert">
            {{ mensajeAviso }}
          </div>
          <!--Aviso de error al agregar contacto-->
          <div v-if="mensajeError" class="alert alert-danger" role="alert">
            {{ mensajeError }}
          </div>
        </div>
        <form class="contacto">
          <!--Primera fila-->
          <div class="form-row">
            <!--Primera columna - paciente-->
            <div class="col">
              <p>
                <span
                  >Paciente: {{ datosFormulario.nombres }}
                  {{ datosFormulario.apellido1 }}
                  {{ datosFormulario.apellido2 }}</span
                >
              </p>
            </div>
          </div>
          <!--Segunda fila-->
          <div class="row">
            <!--Primera columna - tipo de acción gestor-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label" for="accion_gestor"
                >Tipo de contacto</label
              >
              <select
                class="form-select"
                v-model="nuevoContacto.accion_gestor"
                id="accion_gestor"
                required
              >
                <option disabled selected>Tipo de contacto</option>
                <option v-for="accion in acciones" :value="accion.id">
                  {{ accion.nombre }}
                </option>
              </select>
            </div>
            <!--Segunda columna - resultado-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label" for="resultado_contacto"
                >Resultado</label
              >
              <select
                class="form-select"
                v-model="nuevoContacto.resultado_contacto"
                id="resultado_contacto"
                required
              >
                <option disabled selected>Resultado</option>
                <option v-for="resultado in resultados" :value="resultado.id">
                  {{ resultado.nombre }}
                </option>
              </select>
            </div>
          </div>
          <!--Tercera fila-->
          <div class="row">
            <!--Primera columna - tipo de motivo-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label" for="motivo">Motivo</label>
              <select
                class="form-select"
                v-model="tipo_motivo"
                @change="cambioTipoMotivo"
                id="motivo"
                required
              >
                <option disabled selected>Motivo</option>
                <option value="actividades">Actividad</option>
                <option value="medicamentos">Medicamento</option>
                <option value="diagnosticos">Diagnóstico</option>
              </select>
            </div>
            <!--Segunda columna - motivo-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label" for="motivo">Especificar</label>
              <select
                class="form-select"
                v-model="nuevoContacto.motivo"
                id="secondSelect"
                :disabled="tipo_motivo === '' || motivos.length === 0"
              >
                <option v-for="motivo in motivos" :value="motivo">
                  {{ motivo }}
                </option>
              </select>
            </div>
          </div>
          <!--Cuarta fila-->
          <div class="row">
            <!--Primera columna - botones-->
            <div class="col text-center">
              <button
                type="submit"
                class="btn btn-primary"
                @click="agregarContacto"
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormContacto',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      acciones: [],
      resultados: [],
      tipo_motivo: '',
      //Motivos
      motivos: [],
      actividades_paciente: [],
      medicamentos_paciente: [],
      diagnosticos_paciente: this.datosFormulario.diagnosticos,

      nuevoContacto: {
        paciente: this.datosFormulario.id,
        gestor: this.datosFormulario.gestor,
        fecha: new Date().toISOString().slice(0, 10),
        accion_gestor: '',
        motivo: '',
        resultado_contacto: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Limpia el formulario
    limpiarFormulario() {
      console.log('nuevo contacto:', this.nuevoContacto)
      console.log('accion id:', this.nuevoContacto.accion_gestor)
      console.log('motivo:', this.nuevoContacto.motivo)
      console.log('resultado:', this.nuevoContacto.resultado_contacto)
      this.nuevoContacto.accion_gestor = ''
      this.nuevoContacto.motivo = ''
      this.nuevoContacto.resultado_contacto = ''
      this.tipo_motivo = ''
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
    //Valida que los campos del formulario no estén vacíos
    validarFormulario() {
      if (this.nuevoContacto.accion_gestor === '') {
        this.mensajeError = 'Debe seleccionar un tipo de contacto'
        return false
      } else if (this.nuevoContacto.motivo === '') {
        this.mensajeError = 'Debe seleccionar un motivo'
        return false
      } else if (this.nuevoContacto.resultado_contacto === '') {
        this.mensajeError = 'Debe seleccionar un resultado'
        return false
      } else {
        return true
      }
    },
    //Agrega el contacto a la base de datos
    async agregarContacto() {
      if (this.validarFormulario()) {
        return true
      }
    },
    //Obtiene las acciones de gestor
    async getAcciones() {
      axios
        .get(this.$axios.defaults.baseURL + 'acciones_gestor')
        .then((response) => {
          this.acciones = response.data
          console.log('Acciones:', this.acciones)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //Obtiene las actividades asignadas al paciente
    async getActividadesPaciente() {
      axios
        .get(
          this.$axios.defaults.baseURL +
            `asignacion_actividades/paciente/${this.datosFormulario.id}/`
        )
        .then((response) => {
          this.actividades_paciente = response.data
          console.log('Actividades:', this.actividades_paciente)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //Obtiene los medicamentos asignados al paciente
    async getMedicamentosPaciente() {
      axios
        .get(
          this.$axios.defaults.baseURL +
            `historial_medicamento/paciente/${this.datosFormulario.id}/`
        )
        .then((response) => {
          this.medicamentos_paciente = response.data
          console.log('Medicamentos:', this.medicamentos_paciente)
        })
        .catch((error) => {
          console.log(error)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al cargar medicamentos'
        })
    },
    //Obtiene los resultados de contacto
    async getResultados() {
      axios
        .get(this.$axios.defaults.baseURL + 'resultados_contacto/')
        .then((response) => {
          this.resultados = response.data
          console.log('Resultados:', this.resultados)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //Cambia el tipo de motivo
    cambioTipoMotivo() {
      switch (this.tipo_motivo) {
        case 'actividades':
          if (this.actividades_paciente.length === 0) {
            this.motivos = []
            this.mensajeAviso = ''
            this.mensajeError = 'El paciente no tiene actividades asignadas'
          } else {
            this.mensajeAviso = ''
            this.mensajeError = ''
            this.nuevoContacto.motivo = ''
            this.motivos = this.actividades_paciente
          }
          break
        case 'medicamentos':
          if (this.medicamentos_paciente.length === 0) {
            this.motivos = []
            this.mensajeAviso = ''
            this.mensajeError = 'El paciente no tiene medicamentos asignados'
          } else {
            this.mensajeAviso = ''
            this.mensajeError = ''
            this.nuevoContacto.motivo = ''
            this.motivos = this.medicamentos_paciente
          }
          break
        case 'diagnosticos':
          if (this.diagnosticos_paciente.length === 0) {
            this.motivos = []
            this.mensajeAviso = ''
            this.mensajeError = 'El paciente no tiene diagnósticos'
          } else {
            this.mensajeAviso = ''
            this.mensajeError = ''
            this.nuevoContacto.motivo = ''
            this.motivos = this.diagnosticos_paciente
          }
          break
        default:
          this.nuevoContacto.motivo = ''
          this.motivos = []
      }
    },
  },
  mounted() {
    this.getAcciones()
    this.getResultados()
    this.getActividadesPaciente()
    this.getMedicamentosPaciente()
    console.log('Diagnosticos listados:', this.diagnosticos_paciente)
  },
}
</script>
<style scoped>
.col span {
  font-weight: bold;
}
@media (max-width: 540px) {
  label {
    margin-bottom: 0px !important;
    margin-top: 1px;
  }
}
</style>
