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
              <label class="form-label required" for="accion_gestor"
                >Tipo de contacto</label
              >
              <select
                class="form-select"
                v-model="nuevoContacto.accion_gestor"
                id="accion_gestor"
                required
              >
                <option v-for="accion in acciones" :value="accion.id">
                  {{ accion.nombre }}
                </option>
              </select>
            </div>
            <!--Segunda columna - resultado-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label required" for="resultado_contacto"
                >Resultado</label
              >
              <select
                class="form-select"
                v-model="nuevoContacto.resultado_contacto"
                id="resultado_contacto"
                required
              >
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
              <label class="form-label required" for="motivo">Motivo</label>
              <select
                class="form-select"
                v-model="nuevoContacto.tipo_motivo"
                @change="cambioTipoMotivo"
                id="motivo"
                required
              >
                <option :value="3">Asignación</option>
                <option :value="2">Medicamento</option>
                <option :value="1">Diagnóstico</option>
              </select>
            </div>
            <!--Segunda columna - motivo-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label required" for="motivo"
                >Especificar</label
              >
              <select
                class="form-select"
                v-model="nuevoContacto.motivo"
                id="secondSelect"
                :disabled="
                  this.nuevoContacto.tipo_motivo === '' ||
                  this.motivos.length === 0
                "
              >
                <option v-for="motivo in motivos" :value="motivo">
                  {{ motivo }}
                </option>
              </select>
            </div>
          </div>
          <!--Cuarta fila-->
          <div class="row">
            <!--Primera columna - fecha-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label required" for="fecha">Fecha</label>
              <input
                class="form-control"
                type="date"
                v-model="nuevoContacto.fecha"
                id="fecha"
                :max="new Date().toISOString().slice(0, 10)"
              />
            </div>
            <!--Segunda columna - hora-->
            <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
              <label class="form-label required" for="hora">Hora</label>
              <input
                class="form-control"
                type="time"
                v-model="nuevoContacto.hora"
                id="hora"
                required
              />
            </div>
          </div>
          <!--Quinta fila-->
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
      //Motivos
      motivos: [],
      actividades_paciente: [],
      medicamentosPaciente: [],
      diagnosticos_paciente: this.datosFormulario.diagnosticos,
      all_actividades: [],

      nuevoContacto: {
        paciente: this.datosFormulario.id,
        gestor: this.datosFormulario.gestor,
        fecha: '',
        hora: '',
        tipo_motivo: '',
        motivo: '',
        accion_gestor: '',
        resultado_contacto: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Limpiar formulario
    limpiarFormulario() {
      this.nuevoContacto.accion_gestor = ''
      this.nuevoContacto.motivo = ''
      this.nuevoContacto.resultado_contacto = ''
      this.nuevoContacto.tipo_motivo = ''
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
    //Validar formulario
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
      } else if (this.nuevoContacto.fecha === '') {
        this.mensajeError = 'Debe seleccionar una fecha del contacto'
        return false
      } else if (
        this.nuevoContacto.fecha > new Date().toISOString().slice(0, 10)
      ) {
        this.mensajeError =
          'La fecha del contacto no puede ser después la fecha actual'
        return false
      } else if (this.nuevoContacto.hora === '') {
        this.mensajeError = 'Debe seleccionar una hora del contacto'
        return false
      } else if (
        this.nuevoContacto.hora < '08:00' ||
        this.nuevoContacto.hora > '18:00'
      ) {
        this.mensajeError =
          'La hora de la actividad debe estar entre las 8:00 y las 18:00'
        return false
      } else {
        return true
      }
    },
    //Agrega el contacto a la base de datos
    async agregarContacto() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + `historial_contactos/`,
            this.nuevoContacto,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Contacto agregado correctamente'
        } catch (error) {
          console.error('Error al agregar contacto:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar contacto'
          setTimeout(() => {
            this.mensajeError = ''
          }, 4000)
        }
      }
    },
    //Obtiene las acciones de gestor
    async getAcciones() {
      axios
        .get(this.$axios.defaults.baseURL + 'acciones_gestor')
        .then((response) => {
          this.acciones = response.data
        })
        .catch((error) => {
          console.log('Error al obtener las acciones', error)
        })
    },
    //Obtiene todas las actividades médicas
    async getActividades() {
      axios
        .get(this.$axios.defaults.baseURL + 'actividades_medicas')
        .then((response) => {
          this.all_actividades = response.data.map(
            (actividad) => actividad.nombre
          )
        })
        .catch((error) => {
          console.log('Error al obtener las actividades', error)
        })
    },
    //Obtiene las actividades asignadas al paciente
    async getActividadesPaciente() {
      axios
        .get(
          this.$axios.defaults.baseURL +
            `asignacion_actividades/paciente/${this.datosFormulario.id}/pendientes/`
        )
        .then((response) => {
          this.actividades_paciente = response.data
          console.log('Actividades paciente', this.actividades_paciente)
        })
        .catch((error) => {
          console.log('Error al obtener las actividades del paciente', error)
        })
    },
    //Obtiene los medicamentos asignados al paciente
    async getMedicamentosPaciente() {
      axios
        .get(
          this.$axios.defaults.baseURL +
            `historial_medicamentos/paciente/${this.datosFormulario.id}/medicamentos/`
        )
        .then((response) => {
          this.medicamentosPaciente = response.data.nombres_medicamentos
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
        })
        .catch((error) => {
          console.log('Error al obtener los resultados', error)
        })
    },
    //Cambia el tipo de motivo
    cambioTipoMotivo() {
      switch (this.nuevoContacto.tipo_motivo) {
        case 3:
          if (this.actividades_paciente.length === 0) {
            if (this.nuevoContacto.accion_gestor != 5) {
              this.motivos = this.all_actividades
            } else {
              this.motivos = []
            }
            this.mensajeAviso = 'El paciente no tiene actividades asignadas'
            this.mensajeError = ''
          } else {
            if (this.nuevoContacto.accion_gestor === 5) {
              this.motivos = this.all_actividades
              this.mensajeAviso = ''
              this.mensajeError = ''
            } else {
              this.mensajeAviso = ''
              this.mensajeError = ''
              this.nuevoContacto.motivo = ''
              this.motivos = this.actividades_paciente
            }
          }
          break
        case 2:
          if (this.medicamentosPaciente.length === 0) {
            this.motivos = []
            this.mensajeError = ''
            this.mensajeAviso = 'El paciente no tiene medicamentos asignados'
          } else {
            this.mensajeAviso = ''
            this.mensajeError = ''
            this.nuevoContacto.motivo = ''
            this.motivos = this.medicamentosPaciente
          }
          break
        case 1:
          if (this.diagnosticos_paciente.length === 0) {
            this.motivos = []
            this.mensajeError = ''
            this.mensajeAviso = 'El paciente no tiene diagnósticos'
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
    this.getActividades()
    this.getActividadesPaciente()
    this.getMedicamentosPaciente()
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
