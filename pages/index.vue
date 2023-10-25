<template>
  <section class="gradient-custom">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">HRS</h2>
                <p class="mb-5">
                  Por favor, ingresa tu correo y tu contraseña.
                </p>

                <div class="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="typeEmailX"
                    class="form-control form-control-lg"
                    placeholder="Ingrese su correo electrónico"
                  />
                  <label class="form-label" for="typeEmailX">Correo</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input
                    type="password"
                    id="typePasswordX"
                    class="form-control form-control-lg"
                    placeholder="Ingrese su contraseña"
                  />
                  <label class="form-label" for="typePasswordX"
                    >Contraseña</label
                  >
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text" href="#!">¿Olvidaste tu contraseña?</a>
                </p>

                <button
                  onclick="location.href='/recomendaciones'"
                  class="btn btn-primary btn-lg px-5"
                  type="submit"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.container {
  margin-top: 10px;
  max-height: 100vh;
}

.card {
  background-color: #dbe2ef;
  color: #000;
  border-radius: 1rem;
}
</style>
