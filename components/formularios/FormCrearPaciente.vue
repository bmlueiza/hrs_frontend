<template>
  <div class="FormCrearPaciente">
    <form>
      <!-- Primera fila -->
      <div class="row mb-4">
        <!-- Primera columna - nombres-->
        <div class="col">
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
        <div class="col">
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
        <div class="col">
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
      <div class="row mb-4">
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
              v-model="nuevoPaciente.rut"
              maxlength="12"
              minlength="11"
              @input="formatoRut"
              required
            />
          </div>
        </div>

        <!-- Segunda columna - sexo -->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="sexo">Sexo</label>
            <multiselect
              id="sexo"
              v-model="sexoSeleccionado"
              :options="sexos"
              :multiple="false"
              :searchable="false"
              placeholder="Sexo del paciente"
              :select-label="'Seleccionar'"
              :deselect-label="'Eliminar selección'"
              :selected-label="'Seleccionado'"
              :close-on-select="true"
              display="chip"
              required
            ></multiselect>
          </div>
        </div>

        <!-- Tercera columna - fecha de nacimiento -->
        <div class="col">
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
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="riesgo">Riesgo</label>
            <multiselect
              id="riesgo"
              v-model="riesgoSeleccionado"
              :options="riesgos"
              :multiple="false"
              :searchable="false"
              placeholder="Riesgo del paciente"
              :select-label="'Seleccionar'"
              :deselect-label="'Eliminar selección'"
              :selected-label="'Seleccionado'"
              :close-on-select="true"
              display="chip"
              required
            ></multiselect>
          </div>
        </div>
      </div>
      <!-- Tercera fila -->
      <div class="row mb-4">
        <!-- Primera columna - teléfono -->
        <div class="col">
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
        <div class="col">
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
        <div class="col">
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

      <!-- Botón Ingresar paciente -->
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="crearPaciente"
        >
          Ingresar paciente
        </button>
        <button type="reset" class="btn btn-primary" @click.prevent="cancelar">
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
      sexos: ['No especificado', 'Masculino', 'Femenino', 'No aplicable'],
      riesgos: ['Bajo', 'Medio', 'Alto'],
      sexoSeleccionado: '',
      riesgoSeleccionado: '',
      nuevoPaciente: {
        rut: '',
        nombres: '',
        apellido1: '',
        apellido2: '',
        fecha_nacimiento: null,
        sexo: 0,
        telefono: '',
        direccion: '',
        riesgo: 0,
        diagnosticos: [],
        gestor: 1,
      },
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + 'diagnosticos/')
      .then((response) => {
        console.log(response)
        this.listaDiagnosticos = response.data
      })
      .catch((error) => {
        console.log('Error al obtener los datos de diagnosticos:', error)
      })
  },
  methods: {
    async crearPaciente() {
      if (this.validarFormulario()) {
        this.nuevoPaciente.sexo = this.mapSexoANum(this.sexoSeleccionado)
        this.nuevoPaciente.riesgo = this.mapRiesgoANum(this.riesgoSeleccionado)
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
            alert('Paciente creado exitosamente')
            this.form = {
              sexoSeleccionado: '',
              riesgoSeleccionado: '',
              nuevoPaciente: {
                rut: '',
                nombres: '',
                apellido1: '',
                apellido2: '',
                fecha_nacimiento: null,
                sexo: 0,
                telefono: '',
                direccion: '',
                riesgo: 0,
                diagnosticos: [],
                gestor: 1,
              },
            }
          })
          .catch((error) => {
            console.log('Error:', error.response.data)
            alert('Error al crear el paciente')
          })
      }
    },
    async cancelar() {
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
        console.log('El usuario decidió no cancelar')
      }
    },
    validarFormulario() {
      if (this.nuevoPaciente.nombres === '') {
        alert('El campo nombres es obligatorio')
        return false
      }
      if (this.nuevoPaciente.apellido1 === '') {
        alert('El campo primer apellido es obligatorio')
        return false
      }
      if (this.nuevoPaciente.apellido2 === '') {
        alert('El campo segundo apellido es obligatorio')
        return false
      }
      if (this.nuevoPaciente.rut === '') {
        alert('El campo rut es obligatorio')
        return false
      }
      if (this.nuevoPaciente.sexo === '') {
        alert('El campo sexo es obligatorio')
        return false
      }
      if (this.nuevoPaciente.fechaNacimiento === '') {
        alert('El campo fecha de nacimiento es obligatorio')
        return false
      }
      if (this.nuevoPaciente.telefono === '') {
        alert('El campo teléfono es obligatorio')
        return false
      }
      if (this.nuevoPaciente.direccion === '') {
        alert('El campo dirección es obligatorio')
        return false
      }
      if (this.nuevoPaciente.riesgo === '') {
        alert('El campo riesgo es obligatorio')
        return false
      }
      if (this.nuevoPaciente.diagnosticos.length === 0) {
        alert('Debe seleccionar al menos un diagnóstico')
        return false
      }
      return true
    },
    mapSexoANum(sexo) {
      switch (sexo) {
        case 'Masculino':
          return 1
        case 'Femenino':
          return 2
        case 'No aplicable':
          return 9
        default:
          return 0
      }
    },
    mapRiesgoANum(riesgo) {
      switch (riesgo) {
        case 'Bajo':
          return 1
        case 'Medio':
          return 2
        case 'Alto':
          return 3
        default:
          return 0
      }
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
      // Eliminar caracteres no numéricos en el cuerpo del RUT, excepto el último dígito después del guion
      let cleanedRut = this.nuevoPaciente.rut.replace(/[^0-9kK]/g, '')

      // Separar el RUT en dos partes: cuerpo y dígito verificador
      let rutBody = cleanedRut.slice(0, -1)
      let rutVerifier = cleanedRut.slice(-1).toLowerCase() // Convertir a minúscula

      // Aplicar formato al cuerpo del RUT permitiendo solo números
      if (rutBody.length <= 8) {
        this.nuevoPaciente.rut = rutBody.replace(
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
      this.nuevoPaciente.rut += rutVerifier
    },
  },
}
</script>
<style>
.btn {
  margin: 5px;
}
.form-label {
  font-weight: bold;
}

@media (max-width: 540px) {
  .form-outline {
    margin-bottom: 20px; /* Ajusta según sea necesario */
  }

  label {
    min-height: 40px; /* Establece una altura mínima para todas las etiquetas */
    display: inline-block;
    margin-bottom: 5px; /* Ajusta según sea necesario */
  }

  .form-control {
    vertical-align: middle; /* Alinea verticalmente los elementos */
  }
}
</style>
