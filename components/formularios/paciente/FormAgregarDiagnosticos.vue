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
            <strong>Paciente:</strong> {{ datosFormulario.nombres }}
            {{ datosFormulario.apellido1 }} {{ datosFormulario.apellido2 }}
          </p>
          <p>
            <strong>Diagnósticos actuales del paciente: </strong
            >{{ formatoDiagnosticos(datosFormulario.diagnosticos) }}
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
            v-model="nuevosDiagnosticos"
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
            type="click"
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
      nuevosDiagnosticos: [],

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
      this.nuevosDiagnosticos = []
      if (this.posiblesDiagnosticos.length > 0) {
        this.mensajeAviso = ''
      }
      this.mensajeError = ''
    },
    //Validar formulario
    validarFormulario() {
      if (this.nuevosDiagnosticos.length === 0) {
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
        console.log(error)
      }
    },
    //Agregar diagnostico al paciente
    async agregarDiagnosticos() {
      if (this.validarFormulario()) {
        this.nuevosDiagnosticos = this.nuevosDiagnosticos.map(
          (diagnostico) => diagnostico.id
        )
        console.log('Nuevo paciente:', this.nuevoPaciente)
        try {
          const response = await axios.put(
            this.$axios.defaults.baseURL +
              `pacientes/${this.datosFormulario.id}/agregar-diagnosticos/`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              diagnosticos: this.nuevosDiagnosticos,
            }
          )
          this.limpiarFormulario()
          this.mensajeAviso = 'Diagnósticos agregados correctamente'
          setTimeout(() => {
            this.mensajeAviso = ''
          }, 6000)
        } catch (error) {
          console.log('Error al agregar diagnósticos:', error.response.data)
          this.mensajeAviso = ''
          this.mensajeError = 'Error al agregar diagnósticos'
          setTimeout(() => {
            this.mensajeError = ''
          }, 6000)
        }
      }
    },
  },
  mounted() {
    this.getDiagnosticos()
  },
}
</script>
