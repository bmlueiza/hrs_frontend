<template>
  <div>
    <Navbar />
    <div class="container">
      <h2>Ingresar paciente</h2>
      <form>
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
          <!-- Columna Nombres-->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="nombres"
                name="nombres"
                class="form-control"
              />
              <label class="form-label" for="nombres">Nombres</label>
            </div>
          </div>
          <!-- Columna Primer apellido-->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="primer_apellido"
                name="primer_apellido"
                class="form-control"
              />
              <label class="form-label" for="primer_apellido"
                >Primer apellido</label
              >
            </div>
          </div>
          <!-- Columna Segundo apellido-->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="segundo_apellido"
                name="segundo_apellido"
                class="form-control"
              />
              <label class="form-label" for="segundo_apellido"
                >Segundo apellido</label
              >
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <!-- Input RUT -->
          <div class="col">
            <div class="form-outline">
              <input type="text" id="rut" name="rut" class="form-control" />
              <label class="form-label" for="rut">RUT</label>
            </div>
          </div>

          <!-- Input Sexo -->
          <div class="col">
            <div class="form-outline">
              <multiselect
                id="sexo"
                v-model="sexo"
                :options="sexos"
                :multiple="false"
                :searchable="false"
                placeholder="F o M"
                :select-label="'Seleccionar'"
                :deselect-label="'Eliminar selección'"
                :selected-label="'Seleccionado'"
                :close-on-select="true"
                display="chip"
              ></multiselect>
              <label class="form-label" for="sexo">Sexo</label>
            </div>
          </div>

          <!-- Input Fecha de nacimiento -->
          <div class="col">
            <div class="form-date">
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                class="form-control"
              />
              <label class="form-label" for="fechaNacimiento"
                >Fecha de nacimiento</label
              >
            </div>
          </div>

          <!-- Input Teléfono -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="telefono"
                name="telefono"
                class="form-control"
              />
              <label class="form-label" for="telefono">Teléfono</label>
            </div>
          </div>

          <!-- Input Dirección -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="direccion"
                name="direccion"
                class="form-control"
              />
              <label class="form-label" for="direccion">Dirección</label>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <!-- Input Alergias -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="alergias"
                name="alergias"
                class="form-control"
                placeholder="Favor de separar por una coma"
              />
              <label class="form-label" for="alergias">Alergias</label>
            </div>
          </div>

          <!-- Input Diagnóstico -->
          <div class="col">
            <div class="form-outline">
              <multiselect
                id="selectDiagnosticos"
                v-model="selectedDiagnosticos"
                :options="diagnosticos"
                :multiple="true"
                :searchable="true"
                :filter="true"
                track-by="id"
                label="codigo"
                placeholder="Seleccione los diagnósticos de este paciente"
                :select-label="'Seleccionar'"
                :deselect-label="'Eliminar selección'"
                :selected-label="'Seleccionado'"
                :no-result="'No se encontraron diagnósticos'"
                :no-options="'No se encontraron diagnósticos'"
                :maxSelected="4"
                :close-on-select="false"
                :preselect-first="true"
                display="chip"
                class="md:w-20rem"
              >
              </multiselect>
            </div>
          </div>
        </div>

        <!-- Input Observaciones-->
        <div class="form-outline mb-2">
          <textarea
            class="form-control"
            id="observaciones"
            name="observaciones"
            rows="4"
          ></textarea>
          <label class="form-label" for="observaciones">Observaciones</label>
        </div>

        <!-- Botón Ingresar paciente -->
        <button type="submit" class="btn btn-primary btn-block mb-10">
          Ingresar paciente
        </button>
        <button type="reset" class="btn btn-primary btn-block mb-10">
          Cancelar
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
      selectedDiagnosticos: [],
      sexo: '',
      sexos: ['M', 'F'],
      gestorId: 1,
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
  methods: {
    async crearPaciente() {
      const paciente = {
        nombres: this.nombres,
        primer_apellido: this.primer_apellido,
        segundo_apellido: this.segundo_apellido,
        rut: this.rut,
        sexo: this.sexo,
        fecha_nacimiento: this.fechaNacimiento,
        telefono: this.telefono,
        direccion: this.direccion,
        observaciones: this.observaciones,
        alergias: this.alergias,
        diagnosticos: this.selectedDiagnosticos.map(
          (diagnostico) => diagnostico.id
        ),
        gestor: this.gestorId,
      }
      try {
        await axios.post(
          'http://localhost:8000/hrsapp/api/pacientes/crear/',
          paciente
        )
        alert('Paciente creado con éxito')
      } catch (error) {
        console.log('Error al crear el paciente:', error)
      }
    },
  },
}
</script>

<style>
.container {
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #dbe2ef;
  padding: 20px;
}
.form {
  color: aliceblue;
  align-self: center;
}
.container h2 {
  text-align: center;
}
.btn {
  margin: 2%;
  align-items: center;
}
</style>
