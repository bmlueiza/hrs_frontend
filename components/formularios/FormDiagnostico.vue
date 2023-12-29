<template>
  <div>
    <!-- Aviso de diagnostico agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar gestor -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="diagnostico">
      <!-- Primera fila -->
      <div class="row">
        <!-- Primera columna - nombre -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label required" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevoDiagnostico.nombre"
              maxlength="50"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - código-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label required" for="codigo">Código</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              class="form-control"
              autocomplete="off"
              v-model="nuevoDiagnostico.codigo"
              maxlength="10"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!-- Primera columna - descripción -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="descripcion">Descripción</label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              class="form-control"
              placeholder="No obligatorio. Máximo 200 caracteres."
              autocomplete="off"
              v-model="nuevoDiagnostico.descripcion"
              maxlength="200"
            ></textarea>
          </div>
        </div>
      </div>
    </form>
    <div class="botones text-center">
      <button type="submit" class="btn btn-primary" @click="agregarDiagnostico">
        Añadir diagnostico
      </button>
      <button type="button" class="btn btn-primary" @click="limpiarFormulario">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormDiagnostico',
  data() {
    return {
      nuevoDiagnostico: {
        nombre: '',
        codigo: '',
        descripcion: '',
      },
      mensajeError: '',
      mensajeAviso: '',
    }
  },
  methods: {
    async agregarDiagnostico() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + 'diagnosticos/',
            this.nuevoDiagnostico,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Diagnostico agregado correctamente.'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 6000)
        } catch (error) {
          console.log('Error:', error.response.data)
          this.mensajeError =
            error.response.data.codigo[0] || 'Error al agregar diagnostico.'
          this.mensajeAviso = ''
        }
      }
    },
    validarFormulario() {
      if (this.nuevoDiagnostico.nombre.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre.'
        return false
      }
      if (this.nuevoDiagnostico.codigo.trim() === '') {
        this.mensajeError = 'Debe ingresar un código.'
        return false
      }
      return true
    },

    async limpiarFormulario() {
      this.nuevoDiagnostico.nombre = ''
      this.nuevoDiagnostico.codigo = ''
      this.nuevoDiagnostico.descripcion = ''

      this.mensajeError = ''
      this.mensajeAviso = ''
    },
  },
}
</script>
<style scoped>
.row {
  margin-bottom: 10px;
}
.btn {
  margin: 5px;
}
.form-label {
  font-weight: bold;
}
</style>
