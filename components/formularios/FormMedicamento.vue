<template>
  <div>
    <!-- Aviso de medicamento agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar medicamento -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="formMedicamento">
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
              v-model="nuevoMedicamento.nombre"
              maxlength="50"
              required
            />
          </div>
        </div>
      </div>
      <!-- Fin primera fila -->
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
              v-model="nuevoMedicamento.descripcion"
              maxlength="200"
            ></textarea>
          </div>
        </div>
        <!-- Fin primera columna -->
      </div>
      <!-- Fin segunda fila -->
    </form>
    <div class="botones text-center">
      <button @click="agregarMedicamento" class="btn btn-primary" type="submit">
        Agregar medicamento
      </button>
      <button @click="limpiarFormulario" class="btn btn-primary" type="button">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormMedicamento',
  data() {
    return {
      nuevoMedicamento: {
        nombre: '',
        descripcion: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    async agregarMedicamento() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.post(
            this.$axios.defaults.baseURL + 'medicamentos/',
            this.nuevoMedicamento,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          console.log('Nuevo medicamento:', this.nuevoMedicamento)
          this.limpiarFormulario()
          this.mensajeAviso = 'Medicamento agregado correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 3000)
        } catch (error) {
          console.log(error)
          this.mensajeError =
            error.response.data.codigo[0] || error.response.data.nombre[0]
          this.mensajeAviso = ''
        }
      }
    },
    validarFormulario() {
      if (this.nuevoMedicamento.nombre.trim() === '') {
        this.mensajeError = 'El nombre es obligatorio'
        return false
      }
      return true
    },
    async limpiarFormulario() {
      this.nuevoMedicamento = {
        nombre: '',
        descripcion: '',
      }
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
</style>
