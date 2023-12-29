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
            <strong
              >Paciente: {{ datosFormulario.nombres }}
              {{ datosFormulario.apellido1 }}
              {{ datosFormulario.apellido2 }}</strong
            >
          </p>
        </div>
      </div>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - contenido-->
        <div class="col">
          <label class="form-label required" for="contenido"
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
          ></textarea>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - botones-->
        <div class="col text-center">
          <button
            type="button"
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
      usuario: '',
      nuevaObservacion: {
        contenido: '',
        paciente: parseInt(this.datosFormulario.id),
        gestor: '',
        fecha_generacion: new Date().toISOString().split('T')[0],
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  mounted() {
    this.cargarUsuario()
  },
  methods: {
    async cargarUsuario() {
      try {
        const usuarioInfoString = localStorage.getItem('gestor')

        if (usuarioInfoString) {
          this.usuario = JSON.parse(usuarioInfoString)
        }
      } catch (error) {
        console.log('Error al cargar el usuario', error)
      }
    },
    async agregarObservacion() {
      this.nuevaObservacion.gestor = this.usuario.id
      if (this.validarFormulario()) {
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + `observaciones/`,
            this.nuevaObservacion
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Observación agregada correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
            window.location.reload()
          }, 2100)
        } catch (error) {
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar observación'
          setTimeout(() => {
            this.mensajeError = ''
          }, 3000)
        }
      }
    },
    validarFormulario() {
      if (this.nuevaObservacion.contenido.trim() === '') {
        this.mensajeError = 'El campo Observación es obligatorio'
        this.mensajeAviso = ''
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
