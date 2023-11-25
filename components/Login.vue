<template>
  <div class="card">
    <div class="card-header">
      <h1 class="text-center">HRS</h1>
      <h3 class="text-center">Iniciar Sesión</h3>
    </div>
    <div class="card-body">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input
            type="email"
            class="form-control"
            id="email"
            autocomplete="off"
            v-model="email"
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
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      // Aquí puedes agregar la lógica para enviar la solicitud de inicio de sesión al servidor
      // Por ahora, simplemente imprimo los datos en la consola
      console.log('Usuario:', this.email)
      console.log('Contraseña:', this.password)

      // Redireccionar a la página de recomendaciones si el inicio de sesión es exitoso
      this.$router.push('/recomendaciones')
    },
  },
}
</script>

<style scoped>
.card {
  width: 30%;
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
