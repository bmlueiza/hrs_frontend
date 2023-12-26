<template>
  <div>
    <!-- Aviso de medico agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar medico -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="medico">
      <!-- Primera fila -->
      <div class="row">
        <!-- Primera columna - rut -->
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-outline">
            <label class="form-label required" for="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.rut"
              @input="formatRut"
              maxlength="12"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - especialidad -->
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-outline">
            <label class="form-label required" for="especialidad"
              >Especialidad</label
            >
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.especialidad"
              maxlength="50"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!-- Primera columna - nombre -->
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-outline">
            <label class="form-label required" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.nombre"
              maxlength="25"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - apellido -->
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-outline">
            <label class="form-label required" for="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              class="form-control"
              autocomplete="off"
              v-model="nuevoMedico.apellido"
              maxlength="25"
              required
            />
          </div>
        </div>
      </div>
    </form>
    <div class="botones text-center">
      <button type="submit" class="btn btn-primary" @click="agregarMedico">
        Agregar
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
  name: 'FormMedico',
  data() {
    return {
      nuevoMedico: {
        rut: '',
        especialidad: '',
        nombre: '',
        apellido: '',
      },
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    async agregarMedico() {
      if (this.validarFormulario()) {
        try {
          console.log('Nuevo medico:', this.nuevoMedico)
          const response = await axios.post(
            this.$axios.defaults.baseURL + 'medicos/',
            this.nuevoMedico,
            { headers: { 'Content-Type': 'application/json' } }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Medico agregado correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 3000)
        } catch (error) {
          console.log(error)
          this.mensajeError = 'Error al agregar medico'
          this.mensajeAviso = ''
        }
      }
    },
    validarFormulario() {
      if (this.nuevoMedico.rut.trim() === '') {
        this.mensajeError = 'Debe ingresar un RUT'
        return false
      }
      if (this.nuevoMedico.especialidad.trim() === '') {
        this.mensajeError = 'Debe ingresar una especialidad'
        return false
      }
      if (this.nuevoMedico.nombre.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre'
        return false
      }
      if (this.nuevoMedico.apellido.trim() === '') {
        this.mensajeError = 'Debe ingresar un apellido'
        return false
      }
      return true
    },
    async limpiarFormulario() {
      this.nuevoMedico.rut = ''
      this.nuevoMedico.especialidad = ''
      this.nuevoMedico.nombre = ''
      this.nuevoMedico.apellido = ''
      this.mensajeError = ''
      this.mensajeAviso = ''
    },
    formatRut() {
      // Eliminar caracteres no numéricos en el cuerpo del RUT, excepto el último dígito después del guion
      this.nuevoMedico.rut = this.nuevoMedico.rut.replace(/[^0-9kK]/g, '')
      let rut = this.nuevoMedico.rut

      // Aplicar formato al cuerpo del RUT permitiendo solo números
      if (rut.length > 7) {
        // Obtener parte numérica y dígito verificador
        const parteNumerica = rut.slice(0, -1)
        const digitoVerificador = rut.slice(-1).toLowerCase()

        // Formatear la parte numérica
        let rutFormateado = parteNumerica.replace(
          /(\d)(?=(\d{3})+(?!\d))/g,
          '$1.'
        )

        // Agregar el guión y el dígito verificador
        rutFormateado = rutFormateado + '-' + digitoVerificador

        // Actualizar el valor del RUT en el modelo
        this.nuevoMedico.rut = rutFormateado
      }
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
