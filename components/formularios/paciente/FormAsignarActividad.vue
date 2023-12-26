<template>
  <div class="FormAsignarActividad">
    <!-- Aviso de paciente agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar paciente -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="crear-asignacion">
      <!-- Primera fila -->
      <div class="row">
        <!--Primera columna - nombre paciente-->
        <div class="col">
          <p>
            <strong>Paciente:</strong> {{ datosFormulario.nombres }}
            {{ datosFormulario.apellido1 }} {{ datosFormulario.apellido2 }}
          </p>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!--Primera columna - actividad medica-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="actividad_medica"
            >Asignar</label
          >
          <select
            class="form-select"
            id="actividad_medica"
            name="actividad_medica"
            v-model="nuevaAsignacion.actividad_medica"
            required
          >
            <option
              v-for="actividad in actividades"
              :key="actividad.id"
              :value="actividad.id"
            >
              {{ actividad.nombre }}
            </option>
          </select>
        </div>
        <!--Segunda columna - fecha actividad-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="fecha_actividad"
            >Fecha actividad</label
          >
          <input
            class="form-control"
            type="date"
            id="fecha_actividad"
            name="fecha_actividad"
            v-model="nuevaAsignacion.fecha_actividad"
            :min="nuevaAsignacion.fecha_asignacion"
            required
          />
        </div>
      </div>
      <!-- Tercera fila -->
      <div class="row">
        <!--Primera columna - hora actividad-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label required" for="hora_actividad"
            >Hora actividad</label
          >
          <input
            class="form-control"
            type="time"
            id="hora_actividad"
            name="hora_actividad"
            v-model="nuevaAsignacion.hora_actividad"
            required
          />
        </div>
        <!--Segunda columna - médico-->
        <div class="form-group col-12 col-md-6 col-lg-6 mb-2">
          <label class="form-label" for="medico">Médico</label>
          <select
            class="form-select"
            id="medico"
            name="medico"
            v-model="nuevaAsignacion.medico"
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
      <!-- Cuarta fila -->
      <div class="row">
        <!--Primera columna - botones-->
        <div class="col text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="agregarAsignacion"
          >
            Asignar
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
  <!--paciente, actividad_medica, fecha_asignacion,
  fecha_actividad, hora_actividad, estado (ESTADO_CHOICES), medico (opcional)-->
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormAsignarActividad',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actividades: [],
      medicos: [],
      nuevaAsignacion: {
        paciente: this.datosFormulario.id,
        actividad_medica: '',
        fecha_asignacion: new Date().toISOString().split('T')[0],
        fecha_actividad: '',
        hora_actividad: '',
        estado: 1,
        medico: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Limpiar formulario
    limpiarFormulario() {
      this.nuevaAsignacion = {
        actividad_medica: '',
        fecha_actividad: '',
        hora_actividad: '',
        medico: '',
      }
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
    //Validar formulario
    validarFormulario() {
      if (this.nuevaAsignacion.actividad_medica === '') {
        this.mensajeError = 'Debe seleccionar una actividad a asignar'
        return false
      } else if (this.nuevaAsignacion.fecha_actividad === '') {
        this.mensajeError = 'Debe seleccionar una fecha para la actividad'
        return false
      } else if (
        this.nuevaAsignacion.fecha_actividad <
        this.nuevaAsignacion.fecha_asignacion
      ) {
        this.mensajeError =
          'La fecha de la actividad no puede ser anterior a la fecha de hoy'
        return false
      } else if (
        this.nuevaAsignacion.hora_actividad < '08:00' ||
        this.nuevaAsignacion.hora_actividad > '18:00'
      ) {
        this.mensajeError =
          'La hora de la actividad debe estar entre las 8:00 y las 18:00'
        return false
      } else if (this.nuevaAsignacion.hora_actividad === '') {
        this.mensajeError = 'Debe seleccionar una hora para la actividad'
        return false
      } else {
        return true
      }
    },
    //Obtener actividades
    async getActividades() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'actividades_medicas/'
        )
        this.actividades = response.data
      } catch (error) {
        console.log('Error al obtener las actividades:', error)
      }
    },
    //Obtener médicos
    async getMedicos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'medicos/'
        )
        this.medicos = response.data
      } catch (error) {
        console.log('Error al obtener los médicos:', error)
      }
    },
    //Agregar asignación
    async agregarAsignacion() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + 'asignacion_actividades/',
            this.nuevaAsignacion,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Asignación agregada correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 4000)
        } catch (error) {
          console.error('Error al agregar asignación:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar asignación'
          setTimeout(() => {
            this.mensajeError = ''
          }, 4000)
        }
      }
    },
  },
  mounted() {
    //Obtener actividades
    this.getActividades()
    //Obtener médicos
    this.getMedicos()
  },
}
</script>
