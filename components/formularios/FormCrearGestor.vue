<template>
  <div>
    <!-- Aviso de gestor agregado correctamente -->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar gestor -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form>
      <!-- Primera fila -->
      <div class="row">
        <!-- Primera columna - RUT -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              class="form-control"
              placeholder="Ej: 12.345.678-9"
              autocomplete="off"
              v-model="nuevoGestor.rut"
              @input="formatRut"
              maxlength="12"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - nombre-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.nombre"
              @input="formatoNombre('nombre')"
              maxlength="25"
              required
            />
          </div>
        </div>
        <!-- Tercera columna - apellido-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.apellido"
              @input="formatoNombre('apellido')"
              maxlength="25"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!-- Primera columna - teléfono -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              class="form-control"
              autocomplete="off"
              placeholder="Ej: +56912345678"
              v-model="nuevoGestor.telefono"
              @input="filtrarLetras"
              maxlength="12"
              minlength="11"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - correo -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="email">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.email"
              maxlength="50"
              required
            />
          </div>
        </div>
        <!-- Tercera columna - contraseña -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.password"
              maxlength="12"
              required
            />
          </div>
        </div>
      </div>
    </form>
    <div class="botones text-center">
      <!--Botón añadir gestor-->
      <button @click="crearGestor" type="button" class="btn btn-primary">
        Añadir gestor
      </button>
      <!--Botón cancelar-->
      <button @click="limpiarFormulario" type="button" class="btn btn-primary">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormCrearGestor',
  data() {
    return {
      nuevoGestor: {
        rut: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
      },
      mensajeError: '',
      mensajeAviso: '',
    }
  },
  methods: {
    formatoNombre(campo) {
      if (campo === 'nombre') {
        this.nuevoGestor.nombre = this.nuevoGestor.nombre.replace(/[0-9]/g, '')
        this.nuevoGestor.nombre =
          this.nuevoGestor.nombre.charAt(0).toUpperCase() +
          this.nuevoGestor.nombre.slice(1)
        this.nuevoGestor.nombre = this.nuevoGestor.nombre.replace(/\s/g, '') // Eliminar espacios
      } else if (campo === 'apellido') {
        this.nuevoGestor.apellido = this.nuevoGestor.apellido.replace(
          /[0-9]/g,
          ''
        )
        this.nuevoGestor.apellido =
          this.nuevoGestor.apellido.charAt(0).toUpperCase() +
          this.nuevoGestor.apellido.slice(1)
        this.nuevoGestor.apellido = this.nuevoGestor.apellido.replace(/\s/g, '') // Eliminar espacios
      }
    },
    filtrarLetras() {
      this.nuevoGestor.telefono = this.nuevoGestor.telefono.replace(
        /[a-zA-Z]/g,
        ''
      )
    },
    formatRut() {
      // Eliminar caracteres no numéricos en el cuerpo del RUT, excepto el último dígito después del guion
      let cleanedRut = this.nuevoGestor.rut.replace(/[^0-9kK]/g, '')

      // Separar el RUT en dos partes: cuerpo y dígito verificador
      let rutBody = cleanedRut.slice(0, -1)
      let rutVerifier = cleanedRut.slice(-1).toLowerCase() // Convertir a minúscula

      // Aplicar formato al cuerpo del RUT permitiendo solo números
      if (rutBody.length <= 8) {
        this.nuevoGestor.rut = rutBody.replace(
          /^(\d{0,2})(\d{0,3})(\d{0,3})/,
          (_, p1, p2, p3) => {
            let formatted = p1 ? p1 + '.' : ''
            formatted += p2 ? p2 + '.' : ''
            formatted += p3 ? p3 + '-' : ''
            return formatted
          }
        )
      }

      // Agregar el dígito verificador
      this.nuevoGestor.rut += rutVerifier
    },
    async crearGestor() {
      if (validarFormulario()) {
        axios
          .post(this.$axios.defaults.baseURL + 'gestores/', this.nuevoGestor, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log('Nuevo gestor agregado:', response.data)
            this.limpiarFormulario()
            this.mensajeAviso = 'Gestor agregado correctamente.'
          })
          .catch((error) => {
            console.log('Error:', error.response.data)
            this.mensajeError =
              error.response.data.rut[0] ||
              error.response.data.email[0] ||
              'Error al agregar gestor.'
            this.mensajeAviso = ''
          })
      }
    },
    validarFormulario() {
      if (this.nuevoGestor.rut.trim() === '') {
        this.mensajeError = 'Debe ingresar un RUT.'
        return false
      }
      if (this.nuevoGestor.nombre.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre.'
        return false
      }
      if (this.nuevoGestor.apellido.trim() === '') {
        this.mensajeError = 'Debe ingresar un apellido.'
        return false
      }
      if (this.nuevoGestor.telefono.trim() === '') {
        this.mensajeError = 'Debe ingresar un teléfono.'
        return false
      }
      if (this.nuevoGestor.email.trim() === '') {
        this.mensajeError = 'Debe ingresar un correo.'
        return false
      }
      if (this.nuevoGestor.password.trim() === '') {
        this.mensajeError = 'Debe ingresar una contraseña.'
        return false
      }
      return true
    },
    async limpiarFormulario() {
      this.nuevoGestor.rut = ''
      this.nuevoGestor.nombre = ''
      this.nuevoGestor.apellido = ''
      this.nuevoGestor.telefono = ''
      this.nuevoGestor.email = ''
      this.nuevoGestor.password = ''

      this.mensajeAviso = ''
      this.mensajeError = ''
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
