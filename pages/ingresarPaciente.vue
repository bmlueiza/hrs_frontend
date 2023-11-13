<template>
  <div>
    <Navbar />
    <div class="container">
      <h2 class="text-center">Ingresar paciente</h2>
      <form>
        <!-- Primera fila -->
        <div class="row mb-4">
          <!-- Primera columna - nombres-->
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
          <!-- Segunda columna - primer apellido-->
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
          <!-- Tercera columna - segundo apellido-->
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
        <!-- Segunda fila -->
        <div class="row mb-4">
          <!-- Primera columna - RUT -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="rut"
                name="rut"
                class="form-control"
                placeholder="Ej: 12345678-9"
              />
              <label class="form-label" for="rut">RUT</label>
            </div>
          </div>

          <!-- Segunda columna - sexo -->
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

          <!-- Tercera columna - fecha de nacimiento -->
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

          <!-- Cuarta columna - teléfono -->
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="telefono"
                name="telefono"
                class="form-control"
                placeholder="Ej: +56912345678"
              />
              <label class="form-label" for="telefono">Teléfono</label>
            </div>
          </div>

          <!-- Quinta columna - dirección -->
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
            placeholder="Si no tiene observaciones iniciales, no es necesario llenar este campo"
          ></textarea>
          <label class="form-label" for="observaciones">Observaciones</label>
        </div>

        <!-- Botón Ingresar paciente -->
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="crearPaciente"
          >
            Ingresar paciente
          </button>
          <button
            type="reset"
            class="btn btn-primary"
            @click.prevent="cancelar"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      diagnosticos: [],
      sexos: ['M', 'F'],
      paciente: {
        nombres: '',
        primer_apellido: '',
        segundo_apellido: '',
        rut: '',
        sexo: '',
        fecha_nacimiento: '',
        telefono: '',
        direccion: '',
        observaciones: '',
        alergias: '',
        selectedDiagnosticos: [],
        gestor: 1,
      },
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
    cancelar() {
      const confirmacion = window.confirm(
        '¿Estás seguro que deseas cancelar el ingreso de este paciente?'
      )
      if (confirmacion) {
        this.form = {
          nombres: '',
          primer_apellido: '',
          segundo_apellido: '',
          rut: '',
          sexo: '',
          fechaNacimiento: '',
          telefono: '',
          direccion: '',
          alergias: '',
          selectedDiagnosticos: [],
          observaciones: '',
        }
        console.log(
          'El usuario confirmó la cancelación y los campos fueron reseteados'
        )
      } else {
        // Aquí puedes agregar lógica adicional si el usuario decide no cancelar
        console.log('El usuario decidió no cancelar')
      }
    },
  },
}
</script>
