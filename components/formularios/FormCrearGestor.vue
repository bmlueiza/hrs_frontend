<template>
  <div>
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
              maxlength="12"
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
              maxlength="12"
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
              maxlength="12"
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
    <!-- Aviso de gestor agregado correctamente -->
    <div class="avisos text-center">
      <div v-if="gestorAgregado" class="alert alert-success" role="alert">
        Gestor agregado correctamente
      </div>
      <!-- Aviso de error al agregar gestor -->
      <div v-if="errorAlAgregar" class="alert alert-danger" role="alert">
        Error al agregar gestor. Por favor, inténtalo de nuevo.
      </div>
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
      gestorAgregado: false,
      errorAlAgregar: false,
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
      try {
        console.log('Nuevo gestor:', this.nuevoGestor)
        const response = await axios.post(
          this.$axios.defaults.baseURL + 'gestores/create',
          this.nuevoGestor,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        console.log('Nuevo gestor añadido:', response.data)
        this.gestorAgregado = true
        this.errorAlAgregar = false
        this.limpiarFormulario()
      } catch (error) {
        console.error('Error al añadir nuevo gestor', error)
        this.errorAlAgregar = true
        this.gestorAgregado = false
        if (error.response) {
          console.error('Respuesta de error del servidor:', error.response.data)
        }
      }
    },
    async limpiarFormulario() {
      this.nuevoGestor.rut = ''
      this.nuevoGestor.nombre = ''
      this.nuevoGestor.apellido = ''
      this.nuevoGestor.telefono = ''
      this.nuevoGestor.email = ''
      this.nuevoGestor.password = ''

      this.gestorAgregado = false
      this.errorAlAgregar = false
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
