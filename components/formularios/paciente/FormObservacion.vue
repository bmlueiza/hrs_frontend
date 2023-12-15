<template>
  <div class="form-observacion">
    <!--Aviso de observacion agregada correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error al agregar observacion-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="observacion">
      <div class="row">
        <!--Primera columna - paciente-->
        <div class="col">
          <p>
            <span>Paciente:</span> {{ datosFormulario.nombres }}
            {{ datosFormulario.apellido1 }} {{ datosFormulario.apellido2 }}
          </p>
        </div>
      </div>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - contenido-->
        <div class="col">
          <label class="form-label" for="contenido"
            >Observación (Máx. 200 carácteres)</label
          >
          <textarea
            type="text"
            id="contenido"
            name="contenido"
            class="form-control"
            autocomplete="off"
            v-model="nuevaObservacion.contenido"
            maxlength="200"
            required
          ></textarea>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - botones-->
        <div class="col text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="agregarObservacion"
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
export default {
  name: 'FormObservacion',
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nuevaObservacion: {
        contenido: '',
        paciente: parseInt(this.datosFormulario.id),
        gestor: this.datosFormulario.gestor,
        //fecha de hoy
        fecha_generacion: new Date().toISOString().split('T')[0],
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  mounted() {
    console.log(this.nuevaObservacion.fecha_generacion)
    console.log('Datos:', this.datosFormulario)
    console.log('Paciente:', this.nuevaObservacion.paciente)
    console.log('Gestor:', this.nuevaObservacion.gestor)
  },
  methods: {
    async agregarObservacion() {
      if (this.validarFormulario()) {
        axios
          .post(
            this.$axios.defaults.baseURL + `observaciones/`,
            this.nuevaObservacion,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            this.limpiarFormulario()
            this.mensajeAviso = 'Observación agregada correctamente'
            setTimeout(() => {
              this.mensajeAviso = ''
            }, 4000)
          })
          .catch((error) => {
            console.error('Error al agregar observación:', error.response.data)
            this.mensajeAviso = ''
            this.mensajeError = 'Error al agregar observación'
            setTimeout(() => {
              this.mensajeError = ''
            }, 4000)
          })
      }
    },
    validarFormulario() {
      if (this.nuevaObservacion.contenido.trim() === '') {
        this.mensajeError = 'El campo Observación es obligatorio'
        this.mensajeAviso = ''
        setTimeout(() => {
          this.mensajeError = ''
        }, 3000)
        return false
      }
      return true
    },
    limpiarFormulario() {
      this.nuevaObservacion.contenido = ''
      this.mensajeAviso = ''
      this.mensajeError = ''
    },
  },
}
</script>
<style scoped>
.col span {
  font-weight: bold;
}
</style>
