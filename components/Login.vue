<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-6 mx-auto">
        <!-- Aviso de error al iniciar sesion -->
        <div
          v-if="mensajeError"
          class="alert alert-danger text-center"
          role="alert"
        >
          {{ mensajeError }}
        </div>
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">HRS</h1>
            <h3 class="text-center">Iniciar Sesión</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label"
                  >Nombre de usuario</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  autocomplete="off"
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  autocomplete="off"
                  v-model="password"
                  required
                />
              </div>
              <div class="button text-center">
                <button type="submit" class="btn">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      mensajeError: '',
    }
  },
  methods: {
    async login() {
      console.log('Usuario:', this.username)
      console.log('Contraseña:', this.password)
      try {
        const response = await axios.post(
          this.$axios.defaults.baseURL + 'token/',
          {
            username: this.username,
            password: this.password,
          }
        )
        try {
          const response2 = await axios.get(
            this.$axios.defaults.baseURL + `gestores/username/${this.username}/`
          )
          // Almacenar el objeto completo del gestor en localStorage
          localStorage.setItem('gestor', JSON.stringify(response2.data))
          console.log('response2', response2)
        } catch (error) {
          // Terminar
          return
        }
        // Almacenar el token JWT en localStorage
        localStorage.setItem('access_token', response.data.access)

        // Redireccionar a la página de recomendaciones si el inicio de sesión es exitoso
        this.$router.push('/recomendaciones')
      } catch (error) {
        if (error.response.status === 401) {
          // El servidor respondió con Unauthorized (401)
          // Puedes mostrar un mensaje de error al usuario
          this.mensajeError =
            'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
        } else {
          // Otros errores que pueden ser manejados según sea necesario
          console.error('Error al iniciar sesión:', error)
          this.mensajeError =
            'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
        }
      }
    },
  },
}
</script>

<style scoped>
.card {
  margin: 0 auto;
  margin-top: 10%;
  border-top: 2px solid #3f72af;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #112d4e;
}
.card-header {
  background-color: #112d4e;
  color: #f9f7f7;
}
.card-body {
  background-color: #f9f7f7;
}
.form-control {
  align-self: center;
  border: 1px solid #112d4e;
  border-radius: 8px;
}
.btn {
  background-color: #112d4e;
  color: white;
}
.form-label {
  font-weight: bold;
}

@media (max-width: 600px) {
  .card {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
