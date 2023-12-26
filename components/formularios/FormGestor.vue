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
        <div class="col-12 col-md-4 col-lg-4">
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
        <!-- Segunda columna - first_name-->
        <div class="col-12 col-md-4 col-lg-4">
          <div class="form-outline">
            <label class="form-label" for="first_name">Nombre</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.first_name"
              @input="formatoFirstName('first_name')"
              maxlength="25"
              required
            />
          </div>
        </div>
        <!-- Tercera columna - last_name-->
        <div class="col-12 col-md-4 col-lg-4">
          <div class="form-outline">
            <label class="form-label" for="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.last_name"
              @input="formatoFirstName('last_name')"
              maxlength="25"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row">
        <!-- Primera columna - username -->
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-outline">
            <label class="form-label" for="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              class="form-control"
              autocomplete="off"
              v-model="nuevoGestor.username"
              maxlength="12"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - contraseña -->
        <div class="col-12 col-md-6 col-lg-6">
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
      <!-- Tercera fila -->
      <div class="row">
        <!-- Primera columna - teléfono -->
        <div class="col-12 col-md-6 col-lg-6">
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
        <div class="col-12 col-md-6 col-lg-6">
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
      </div>
    </form>
    <div class="botones text-center">
      <!--Botón añadir gestor-->
      <button @click="crearGestor" type="submit" class="btn btn-primary">
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
  name: 'FormGestor',
  data() {
    return {
      nuevoGestor: {
        rut: '',
        first_name: '',
        last_name: '',
        telefono: '',
        email: '',
        username: '',
        password: '',
      },
      mensajeError: '',
      mensajeAviso: '',
    }
  },
  methods: {
    formatoFirstName(campo) {
      if (campo === 'first_name') {
        this.nuevoGestor.first_name = this.nuevoGestor.first_name.replace(
          /[0-9]/g,
          ''
        )
        this.nuevoGestor.first_name =
          this.nuevoGestor.first_name.charAt(0).toUpperCase() +
          this.nuevoGestor.first_name.slice(1)
        this.nuevoGestor.first_name = this.nuevoGestor.first_name.replace(
          /\s/g,
          ''
        ) // Eliminar espacios
      } else if (campo === 'last_name') {
        this.nuevoGestor.last_name = this.nuevoGestor.last_name.replace(
          /[0-9]/g,
          ''
        )
        this.nuevoGestor.last_name =
          this.nuevoGestor.last_name.charAt(0).toUpperCase() +
          this.nuevoGestor.last_name.slice(1)
        this.nuevoGestor.last_name = this.nuevoGestor.last_name.replace(
          /\s/g,
          ''
        ) // Eliminar espacios
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
      this.nuevoGestor.rut = this.nuevoGestor.rut.replace(/[^0-9kK]/g, '')
      let rut = this.nuevoGestor.rut

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
        this.nuevoGestor.rut = rutFormateado
      }
    },
    async crearGestor() {
      if (this.validarFormulario()) {
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
      if (this.nuevoGestor.first_name.trim() === '') {
        this.mensajeError = 'Debe ingresar un first_name.'
        return false
      }
      if (this.nuevoGestor.last_name.trim() === '') {
        this.mensajeError = 'Debe ingresar un last_name.'
        return false
      }
      if (this.nuevoGestor.username.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre de usuario.'
        return false
      }
      if (this.nuevoGestor.password.trim() === '') {
        this.mensajeError = 'Debe ingresar una contraseña.'
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
      return true
    },
    async limpiarFormulario() {
      this.nuevoGestor.rut = ''
      this.nuevoGestor.first_name = ''
      this.nuevoGestor.last_name = ''
      this.nuevoGestor.telefono = ''
      this.nuevoGestor.email = ''
      this.nuevoGestor.username = ''
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
