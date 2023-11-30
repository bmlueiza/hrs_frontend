<template>
  <div>
    <Navbar />
    <div class="container">
      <h4 class="text-center">
        Paciente {{ paciente.nombres }} {{ paciente.apellido1 }}
        {{ paciente.apellido2 }}
      </h4>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="datos-paciente">
            <h4>Datos del paciente</h4>
            <p><strong>RUT:</strong> {{ paciente.rut }}</p>
            <p>
              <strong>Nombre:</strong> {{ paciente.nombres }}
              {{ paciente.apellido1 }} {{ paciente.apellido2 }}
            </p>
            <p><strong>Sexo:</strong> {{ paciente.sexo }}</p>
            <p>
              <strong>Fecha de nacimiento:</strong>
              {{ paciente.fecha_nacimiento }}
            </p>
            <p><strong>Riesgo:</strong> {{ paciente.riesgo }}</p>
            <p><strong>Dirección:</strong> {{ paciente.direccion }}</p>
            <p><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
          </div>
        </div>
        <!--Segunda columna-->
        <div class="buttons-container d-grid gap-2 col mx-auto">
          <button type="button" class="btn btn-primary">
            Añadir intento de contacto
          </button>
          <button type="button" class="btn btn-primary">
            Añadir observación
          </button>
          <button type="button" class="btn btn-primary">
            Actualizar información del paciente
          </button>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col mr-4">
          <div class="diagnosticos">
            <h4>Diagnósticos</h4>
            <!-- Verificar si paciente.diagnosticos está definido antes de llamar a formatDiagnostico -->
            <p v-if="paciente.diagnosticos">
              {{ formatDiagnostico(paciente.diagnosticos) }}
            </p>
            <!-- Mostrar un mensaje alternativo si paciente.diagnosticos no está definido -->
            <p v-else>No hay diagnósticos disponibles.</p>
          </div>
        </div>
        <!--Segunda columna-->
        <div class="col">
          <h4>Seguimiento</h4>
          <div class="table-responsive">
            <table class="table table-light table-striped table-bordered">
              <!--Cabecera de la tabla Seguimiento-->
              <thead>
                <tr>
                  <th class="header" scope="col">Fecha de contacto</th>
                  <th class="header" scope="col">Tipo</th>
                  <th class="header" scope="col">Resultado</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="observaciones">
            <h4>Observaciones</h4>
            <TablaObservacionesPaciente />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import TablaObservacionesPaciente from '@/components/tablas/TablaObservacionesPaciente.vue'

export default {
  name: 'DetallePaciente',
  components: {
    Navbar,
    TablaObservacionesPaciente,
  },
  data() {
    return {
      pacienteID: this.$route.params.id,
      paciente: {},
    }
  },
  mounted() {
    const pacienteID = this.$route.params.id
    axios
      .get(this.$axios.defaults.baseURL + `pacientes/${this.pacienteID}/`)
      .then((response) => {
        this.paciente = response.data
      })
  },
  methods: {
    formatDiagnostico(diagnosticos) {
      return diagnosticos.join(', ')
    },
  },
}
</script>

<style>
.col-sm-6,
.col {
  background: #f9f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.buttons-container {
  background: none;
  border: none;
  padding: 10px;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
h4 {
  font-size: 30px;
  font-style: italic;
}
</style>
