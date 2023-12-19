<template>
  <div class="FormCrearPaciente">
    <!-- Aviso de paciente agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!-- Aviso de error al agregar paciente -->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="crear-paciente">
      <!-- Primera fila -->
      <div class="row mb-2">
        <!-- Primera columna - nombres-->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              class="form-control"
              autocomplete="off"
              v-model="nuevoPaciente.nombres"
              @input="formatoNombre('nombres')"
              maxlength="50"
              required
            />
          </div>
        </div>
        <!-- Segunda columna - primer apellido-->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="apellido1">Primer apellido</label>
            <input
              type="text"
              id="apellido1"
              name="apellido1"
              class="form-control"
              autocomplete="off"
              v-model="nuevoPaciente.apellido1"
              maxlength="25"
              @input="formatoNombre('apellido1')"
              required
            />
          </div>
        </div>
        <!-- Tercera columna - segundo apellido-->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="apellido2">Segundo apellido</label>
            <input
              type="text"
              id="apellido2"
              name="apellido2"
              class="form-control"
              autocomplete="off"
              v-model="nuevoPaciente.apellido2"
              maxlength="25"
              @input="formatoNombre('apellido2')"
              required
            />
          </div>
        </div>
      </div>
      <!-- Segunda fila -->
      <div class="row mb-2">
        <!-- Primera columna - RUT -->
        <div class="col-12 col-md-3 col-lg-3 mb-1">
          <div class="form-outline">
            <label class="form-label" for="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              class="form-control"
              placeholder="Ej: 12.345.678-9"
              autocomplete="off"
              v-model="nuevoPaciente.rut"
              maxlength="12"
              minlength="11"
              @input="formatoRut"
              required
            />
          </div>
        </div>

        <!-- Segunda columna - sexo -->
        <div class="col-12 col-md-3 col-lg-3 mb-1">
          <div class="form-outline">
            <label class="form-label" for="sexo">Sexo</label>
            <select
              id="sexo"
              v-model="nuevoPaciente.sexo"
              class="form-select"
              required
            >
              <option value="" disabled selected hidden>
                Sexo del paciente
              </option>
              <option v-for="sexo in sexos" :key="sexo[0]" :value="sexo[0]">
                {{ sexo[1] }}
              </option>
            </select>
          </div>
        </div>

        <!-- Tercera columna - fecha de nacimiento -->
        <div class="col-12 col-md-3 col-lg-3 mb-1">
          <div class="form-date">
            <label class="form-label" for="fechaNacimiento"
              >Fecha de nacimiento</label
            >
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              class="form-control"
              v-model="nuevoPaciente.fecha_nacimiento"
              required
            />
          </div>
        </div>

        <!-- Cuarta columna - riesgo -->
        <div class="col-12 col-md-3 col-lg-3 mb-1">
          <div class="form-outline">
            <label class="form-label" for="riesgo">Riesgo</label>
            <select
              id="riesgo"
              v-model="nuevoPaciente.riesgo"
              class="form-select"
              required
            >
              <option value="" disabled selected hidden>
                Riesgo del paciente
              </option>
              <option
                v-for="riesgo in riesgos"
                :key="riesgo[0]"
                :value="riesgo[0]"
              >
                {{ riesgo[1] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- Tercera fila -->
      <div class="row mb-2">
        <!-- Primera columna - teléfono -->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              class="form-control"
              placeholder="Ej: +56912345678"
              autocomplete="off"
              v-model="nuevoPaciente.telefono"
              @input="filtrarLetras"
              maxlength="12"
              required
            />
          </div>
        </div>

        <!-- Segunda columna - direccion -->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              class="form-control"
              autocomplete="off"
              v-model="nuevoPaciente.direccion"
              maxlength="50"
              required
            />
          </div>
        </div>

        <!-- Tercera columna -diagnostico -->
        <div class="col-12 col-md-4 col-lg-4 mb-1">
          <div class="form-outline">
            <label class="form-label" for="diagnosticos">Diagnósticos</label>
            <multiselect
              id="diagnosticos"
              v-model="nuevoPaciente.diagnosticos"
              :options="listaDiagnosticos"
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
              :close-on-select="false"
              :preselect-first="true"
              display="chip"
              class="md:w-20rem"
            >
            </multiselect>
          </div>
        </div>
      </div>

      <!-- Botón Ingresar paciente -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary" @submit="crearPaciente">
          Ingresar paciente
        </button>
        <button type="reset" class="btn btn-primary" @click="limpiarFormulario">
          Cancelar
        </button>
      </div>
    </form>
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
      listaDiagnosticos: [],
      sexos: [],
      riesgos: [],
      sexoSeleccionado: '',
      riesgoSeleccionado: '',
      nuevoPaciente: {
        rut: '',
        nombres: '',
        apellido1: '',
        apellido2: '',
        fecha_nacimiento: null,
        sexo: '',
        telefono: '',
        direccion: '',
        riesgo: '',
        diagnosticos: [],
        gestor: 1,
      },
      // Avisos
      mensajeError: '',
      mensajeAviso: '',
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'diagnosticos/')
      .then((response) => {
        this.listaDiagnosticos = response.data
        console.log('Diagnosticos:', this.listaDiagnosticos)
      })
      .catch((error) => {
        console.log('Error al obtener los datos de diagnosticos:', error)
      }),
      axios
        .get(this.$axios.defaults.baseURL + 'pacientes/riesgos')
        .then((response) => {
          this.riesgos = response.data
          console.log('Riesgos:', this.riesgos)
        })
        .catch((error) => {
          console.log('Error al obtener los datos de riesgos:', error)
        }),
      axios
        .get(this.$axios.defaults.baseURL + 'pacientes/sexos')
        .then((response) => {
          this.sexos = response.data
          console.log('Sexos:', this.sexos)
        })
        .catch((error) => {
          console.log('Error al obtener los datos de sexos:', error)
        })
  },
  methods: {
    async crearPaciente() {
      if (this.validarFormulario()) {
        this.nuevoPaciente.diagnosticos = this.nuevoPaciente.diagnosticos.map(
          (diagnostico) => diagnostico.id
        )
        console.log('Nuevo paciente:', this.nuevoPaciente)
        axios
          .post(
            this.$axios.defaults.baseURL + 'pacientes/',
            this.nuevoPaciente,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            console.log(response)
            this.limpiarFormulario()
            this.mensajeAviso = 'Paciente creado exitosamente'
          })
          .catch((error) => {
            console.log('Error:', error.response.data)
            this.limpiarFormulario()
            this.mensajeError = 'Error al crear el paciente'
          })
      }
    },
    validarFormulario() {
      if (this.nuevoPaciente.nombres.trim() === '') {
        this.mensajeError = 'El campo Nombres es obligatorio'
        return false
      } else if (this.nuevoPaciente.apellido1.trim() === '') {
        this.mensajeError = 'El campo Primer apellido es obligatorio'
        return false
      } else if (this.nuevoPaciente.apellido2.trim() === '') {
        this.mensajeError = 'El campo Segundo apellido es obligatorio'
        return false
      } else if (this.nuevoPaciente.rut.trim() === '') {
        this.mensajeError = 'El campo RUT es obligatorio'
        return false
      } else if (this.nuevoPaciente.rut.lenght < 11) {
        this.mensajeError = 'El campo RUT debe tener al menos 11 caracteres'
        return false
      } else if (this.nuevoPaciente.sexo === '') {
        this.mensajeError = 'Debe seleccionar el sexo del paciente'
        return false
      } else if (this.nuevoPaciente.fechaNacimiento === '') {
        this.mensajeError = 'El campo Fecha de nacimiento es obligatorio'
        return false
      } else if (this.nuevoPaciente.telefono.trim() === '') {
        this.mensajeError = 'El campo Teléfono es obligatorio'
        return false
      } else if (this.nuevoPaciente.direccion.trim() === '') {
        this.mensajeError = 'El campo Dirección es obligatorio'
        return false
      } else if (this.nuevoPaciente.riesgo === '') {
        this.mensajeError = 'Debe seleccionar un riesgo'
        return false
      } else if (this.nuevoPaciente.diagnosticos.length === 0) {
        this.mensajeError = 'Debe seleccionar al menos un diagnóstico'
        return false
      }
      return true
    },
    formatoNombre(campo) {
      if (campo === 'nombres') {
        this.nuevoPaciente.nombres = this.nuevoPaciente.nombres
          .replace(/[^\u00C0-\u017FñÑ a-zA-Z]/g, '')
          .replace(/\b\w/g, (match) => match.toLowerCase()) // Usar toLowerCase para no capitalizar
          .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()) // Capitalizar al inicio de cada palabra
      } else if (campo === 'apellido1' || campo === 'apellido2') {
        this.nuevoPaciente[campo] = this.nuevoPaciente[campo]
          .replace(/[^\u00C0-\u017FñÑ a-zA-Z]/g, '')
          .replace(/\b\w/g, (match) => match.toLowerCase()) // Usar toLowerCase para no capitalizar
          .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()) // Capitalizar al inicio de cada palabra
        this.nuevoPaciente[campo] = this.nuevoPaciente[campo].replace(/\s/g, '') // Eliminar espacios
      }
    },
    filtrarLetras() {
      this.nuevoPaciente.telefono = this.nuevoPaciente.telefono.replace(
        /[a-zA-Z]/g,
        ''
      )
    },
    formatoRut() {
      this.nuevoPaciente.rut = this.nuevoPaciente.rut.replace(/[^0-9kK]/g, '')
      let rut = this.nuevoPaciente.rut

      // Formatear el RUT
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
        this.nuevoPaciente.rut = rutFormateado
      }
    },
    limpiarFormulario() {
      this.nuevoPaciente = {
        rut: '',
        nombres: '',
        apellido1: '',
        apellido2: '',
        fecha_nacimiento: null,
        sexo: '',
        telefono: '',
        direccion: '',
        riesgo: '',
        diagnosticos: [],
        gestor: 1,
      }
      this.mensajeError = ''
      this.mensajeAviso = ''
    },
  },
}
</script>
