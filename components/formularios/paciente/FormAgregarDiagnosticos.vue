<template>
  <div class="form-agregar-posiblesDiagnosticos">
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
    <form class="agregar-posiblesDiagnosticos">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre paciente-->
        <div class="col">
          <p>
            <strong
              >Paciente: {{ datosFormulario.nombres }}
              {{ datosFormulario.apellido1 }}
              {{ datosFormulario.apellido2 }}</strong
            >
          </p>
          <p>
            <strong
              >Diagnósticos actuales del paciente:
              {{ formatoDiagnosticos(datosFormulario.diagnosticos) }}</strong
            >
          </p>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <div class="col">
          <label class="form-label required" for="posiblesDiagnosticos"
            >Agregar diagnósticos</label
          >
          <v-select
            name="posiblesDiagnosticos"
            v-model="nuevoDiagnostico"
            :options="this.posiblesDiagnosticos"
            label="codigo"
            placeholder="Buscar diagnóstico"
            required
          ></v-select>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna - botones-->
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="agregarDiagnosticos"
          >
            Agregar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="limpiarFormulario"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import vSelect from 'vue-select'

export default {
  name: 'FormAgregarDiagnosticos',
  components: {
    vSelect,
  },
  props: {
    datosFormulario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      posiblesDiagnosticos: [],
      nuevoDiagnostico: [],

      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Formato diagnósticos
    formatoDiagnosticos(diagnosticos) {
      return diagnosticos.join(', ')
    },
    //Limpiar formulario
    limpiarFormulario() {
      console.log('Diagnostico cancelado', this.nuevoDiagnostico)
      this.nuevoDiagnostico = []
      if (this.posiblesDiagnosticos.length > 0) {
        this.mensajeAviso = ''
      }
      this.mensajeError = ''
    },
    //Validar formulario
    validarFormulario() {
      if (this.nuevoDiagnostico.length === 0) {
        this.mensajeError = 'Debe seleccionar al menos un diagnóstico'
        return false
      }
      return true
    },
    //Obtener posiblesDiagnosticos
    async getDiagnosticos() {
      try {
        const response = await axios.get(
          this.$axios.defaults.baseURL + `diagnosticos/`
        )
        const diagnosticos = response.data
        //Filtrar posiblesDiagnosticos ya asignados
        this.posiblesDiagnosticos = diagnosticos.filter(
          (diagnostico) =>
            !this.datosFormulario.diagnosticos.includes(diagnostico.codigo)
        )
        if (this.posiblesDiagnosticos.length === 0) {
          this.mensajeAviso =
            'No hay diagnósticos disponibles para este paciente'
        }
      } catch (error) {
        console.log('Error al obtener los posiblesDiagnosticos', error)
      }
    },
    //Agregar diagnostico al paciente
    async agregarDiagnosticos() {
      console.log('Diagnósticos a agregar:', this.nuevoDiagnostico.id)
      if (this.validarFormulario()) {
        try {
          const response = await axios.put(
            this.$axios.defaults.baseURL +
              `pacientes/${this.datosFormulario.id}/agregar_diagnostico/`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              diagnostico: this.nuevoDiagnostico.id,
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Diagnóstico agregado correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
            window.location.reload()
          }, 2100)
        } catch (error) {
          console.log('Error al agregar diagnósticos:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar diagnóstico'
          setTimeout(() => {
            this.mensajeError = ''
          }, 2100)
        }
      }
    },
  },
  mounted() {
    this.getDiagnosticos()
  },
}
</script>
