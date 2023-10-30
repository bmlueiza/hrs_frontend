<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="form-title">
        <h1>Ingresar paciente</h1>
      </div>
      <form>
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
          <!-- Columna Nombres-->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example1" class="form-control" />
              <label class="form-label" for="form6Example1">Nombres</label>
            </div>
          </div>
          <!-- Columna Primer apellido-->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example2" class="form-control" />
              <label class="form-label" for="form6Example2"
                >Primer apellido</label
              >
            </div>
          </div>
          <!-- Columna Segundo apellido-->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example3" class="form-control" />
              <label class="form-label" for="form6Example3"
                >Segundo apellido</label
              >
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <!-- Input RUT -->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example9" class="form-control" />
              <label class="form-label" for="form6Example9">RUT</label>
            </div>
          </div>

          <!-- Input Teléfono -->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example4" class="form-control" />
              <label class="form-label" for="form6Example4">Teléfono</label>
            </div>
          </div>

          <!-- Input Dirección -->
          <div class="col">
            <div class="form-outline">
              <input type="email" id="form6Example5" class="form-control" />
              <label class="form-label" for="form6Example5">Dirección</label>
            </div>
          </div>
        </div>

        <!-- Input Diagnóstico -->
        <div class="form-outline mb-4">
          <multiselect
            v-model="selectedDiagnosticos"
            :options="diagnosticos"
            filter
            track-by="id"
            label="codigo"
            placeholder="Seleccione los diagnósticos de este paciente"
            :maxSelected="4"
            display="chip"
            class="w-full md:w-20rem"
          >
          </multiselect>
        </div>

        <!-- Input Observaciones-->
        <div class="form-outline mb-2">
          <textarea class="form-control" id="form6Example7" rows="4"></textarea>
          <label class="form-label" for="form6Example7">Observaciones</label>
        </div>

        <!-- Botón Ingresar paciente -->
        <button type="submit" class="btn btn-primary btn-block mb-10">
          Ingresar paciente
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      diagnosticos: [],
      selectedDiagnostico: [],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/hrsapp/api/diagnosticos/')
      .then((response) => {
        console.log(response)
        this.diagnosticos = response.data
      })
      .catch((error) => {
        console.log('Error al obtener los datos de diagnosticos:', error)
      })
  },
}
</script>

<style>
.container {
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  color: aliceblue;
  border-color: black;
  border-radius: 5%;
  background-color: #112d4e;
}
.form {
  color: aliceblue;
  align-self: center;
}
.form-title {
  text-align: center;
  color: aliceblue;
}

.btn {
  margin: 2%;
}
</style>
