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
    <form class="editar-asignacion">
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
        <!--Primera columna - nombre actividad-->
        <div class="col">
          <p>
            <strong>Actividad: {{ datosFormulario.actividad_medica }} </strong>
          </p>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna - hora actividad-->
        <div class="col">
          <p>
            <strong>Fecha: {{ datosFormulario.fecha_actividad }}</strong>
          </p>
        </div>
      </div>
      <!--Cuarta fila-->
      <div class="row">
        <!--Primera columna - estado-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              class="form-select"
              v-model="asignacion.estado"
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
        <!--Primera columna - boton guardar-->
        <div class="col mt-3 text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="editarAsignacion"
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
  name: 'FormEditarAsignacion',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //Avisos
      mensajeAviso: '',
      mensajeError: '',
      //Estados
      estados: [],
      //Asignacion
      asignacion: {
        estado: this.datosFormulario.estado,
      },
    }
  },
  methods: {
    async getEstados() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + 'asignacion_actividades/estados'
        )
        this.estados = response.data
      } catch (error) {
        console.log('Error al obtener los estados', error)
      }
    },
    async editarAsignacion() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.patch(
            this.$axios.defaults.baseURL +
              `asignacion_actividades/${this.datosFormulario.id}/`,
            {
              estado: this.asignacion.estado,
            }
          )
          this.mensajeAviso = 'Asignación editada correctamente'
          this.mensajeError = ''
          setTimeout(() => {
            this.$router.push('/asignaciones')
          }, 4000)
        } catch (error) {
          this.mensajeAviso = ''
          this.mensajeError = 'Error al editar la asignación'
        }
      }
    },
    validarFormulario() {
      if (this.asignacion.estado === '') {
        this.mensajeError = 'Debe seleccionar un estado'
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
