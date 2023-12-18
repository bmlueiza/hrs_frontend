<template>
  <div>
    <Navbar />
    <div class="container">
      <!--<h4 class="titulo text-center">
        Paciente {{ paciente.nombres }} {{ paciente.apellido1 }}
        {{ paciente.apellido2 }}
      </h4>-->
      <!--Primera fila - Botones-->
      <div class="row">
        <div class="col buttons-container text-center">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="`#${modalId}`"
            @click="
              abrirModal('FormContacto', 'Registrar contacto con el paciente')
            "
          >
            Añadir contacto
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="`#${modalId}`"
            @click="
              abrirModal(
                'FormAgregarDiagnosticos',
                'Agregar diagnostico al paciente'
              )
            "
          >
            Añadir diagnóstico
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="`#${modalId}`"
            @click="
              abrirModal(
                'FormAsignarActividad',
                'Asignar actividad al paciente'
              )
            "
          >
            Asignar actividad
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="`#${modalId}`"
            @click="
              abrirModal(
                'FormAgregarMedicamento',
                'Asignar medicamento al paciente'
              )
            "
          >
            Añadir medicamento
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="`#${modalId}`"
            @click="
              abrirModal('FormObservacion', 'Añadir observación al paciente')
            "
          >
            Añadir observación
          </button>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna -->
        <div class="col col1 col-md-4 col-lg-4">
          <!--Primera fila - Datos del paciente-->
          <div class="row">
            <div class="col">
              <div class="box">
                <div class="box-header with-border">
                  <h5 class="box-title">
                    {{ paciente.nombres }} {{ paciente.apellido1 }}
                    {{ paciente.apellido2 }}
                  </h5>
                </div>
                <div class="box-body">
                  <div class="datos-paciente">
                    <p>
                      <strong>Nombre:</strong> {{ paciente.nombres }}
                      {{ paciente.apellido1 }} {{ paciente.apellido2 }}
                    </p>
                    <p><strong>RUT:</strong> {{ paciente.rut }}</p>

                    <p><strong>Sexo:</strong> {{ paciente.sexo }}</p>
                    <p>
                      <strong>Fecha de nacimiento:</strong>
                      {{ paciente.fecha_nacimiento }}
                    </p>
                    <p><strong>Riesgo:</strong> {{ paciente.riesgo }}</p>
                    <p class="line"></p>
                    <p><strong>Dirección:</strong> {{ paciente.direccion }}</p>
                    <p><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Segunda fila - Diagnosticos-->
          <div class="row">
            <div class="col col-height">
              <div class="box">
                <div class="box-header with-border">
                  <h5 class="box-title">Diágnosticos</h5>
                </div>
                <div class="box-body">
                  <div class="diagnosticos text-center">
                    <!-- Verificar si paciente.diagnosticos está definido antes de llamar a formatDiagnostico -->
                    <p v-if="paciente.diagnosticos">
                      <strong>{{
                        formatoDiagnosticos(paciente.diagnosticos)
                      }}</strong>
                    </p>
                    <!-- Mostrar un mensaje alternativo si paciente.diagnosticos no está definido -->
                    <p v-else>No hay diagnósticos disponibles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Segunda columna-->
        <div class="col">
          <!--Primera fila - Historial de contacto-->
          <div class="row">
            <div class="col">
              <div class="box">
                <div class="box-header with-border">
                  <h5 class="box-title">Historial de contacto</h5>
                </div>
                <div class="box-body">
                  <div class="historial-contacto">
                    <TablaHistorialContacto :pacienteID="pacienteID" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="box">
                <div class="box-header with-border">
                  <h5 class="box-title">Observaciones</h5>
                </div>
                <div class="box-body">
                  <div class="observaciones">
                    <TablaObservaciones :pacienteID="pacienteID" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="box">
            <div class="box-header with-border">
              <h5 class="box-title">Actividades asignadas</h5>
            </div>
            <div class="box-body">
              <div class="asignacion-actividades">
                <TablaAsignacionActividades :pacienteID="pacienteID" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="box">
            <div class="box-header with-border">
              <h5 class="box-title">Seguimiento medicamentos</h5>
            </div>
            <div class="box-body">
              <div class="seguimiento-medicamentos">
                <TablaHistorialMedicamento :pacienteID="pacienteID" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Modal-->
    <Modal
      :modalTitle="modalTitle"
      :componenteFormulario="currentComponent"
      :datosFormulario="this.paciente"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/modales/Modal.vue'
//Tablas
import TablaHistorialContacto from '@/components/tablas/paciente/TablaHistorialContacto.vue'
import TablaAsignacionActividades from '@/components/tablas/paciente/TablaAsignacionActividades.vue'
import TablaHistorialMedicamento from '@/components/tablas/paciente/TablaHistorialMedicamento.vue'
import TablaObservaciones from '@/components/tablas/paciente/TablaObservaciones.vue'
//Formularios
import FormObservacion from '@/components/formularios/paciente/FormObservacion.vue'
import FormContacto from '@/components/formularios/paciente/FormContacto.vue'
import FormAsignarActividad from '@/components/formularios/paciente/FormAsignarActividad.vue'
import FormAgregarDiagnosticos from '@/components/formularios/paciente/FormAgregarDiagnosticos.vue'
import FormAgregarMedicamento from '@/components/formularios/paciente/FormAgregarMedicamento.vue'

export default {
  name: 'Paciente',
  components: {
    Navbar,
    Modal,
    //Tablas
    TablaHistorialContacto,
    TablaAsignacionActividades,
    TablaObservaciones,
    TablaHistorialMedicamento,
    //Formularios
    FormObservacion,
    FormContacto,
    FormAsignarActividad,
    FormAgregarDiagnosticos,
    FormAgregarMedicamento,
  },
  data() {
    return {
      pacienteID: this.$route.params.id,
      paciente: {},
      //Modal
      modalTitle: '',
      currentComponent: {},
      modalId: 'modalId',
      //Conf extra
      col1Height: 0,
    }
  },
  mounted() {
    axios
      .get(this.$axios.defaults.baseURL + `pacientes/${this.pacienteID}/`)
      .then((response) => {
        this.paciente = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    //Obtener altura de la columna 1
    this.col1Height = document.querySelector('.col1').offsetHeight
  },
  methods: {
    formatoDiagnosticos(diagnosticos) {
      return diagnosticos.join(', ')
    },
    abrirModal(componente, titulo) {
      switch (componente) {
        case 'FormObservacion':
          this.currentComponent = FormObservacion
          break
        case 'FormContacto':
          this.currentComponent = FormContacto
          break
        case 'FormAsignarActividad':
          this.currentComponent = FormAsignarActividad
          break
        case 'FormAgregarDiagnosticos':
          this.currentComponent = FormAgregarDiagnosticos
          break
        case 'FormAgregarMedicamento':
          this.currentComponent = FormAgregarMedicamento
          break
        default:
          this.currentComponent = ''
          return
      }
      this.modalTitle = titulo
    },
  },
}
</script>

<style scoped>
/*.col-sm-6,
.col {
  background: #f9f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.titulo {
  font-size: 30px;
  font-style: italic;
}*/
.line {
  border-bottom: 1px solid #ccc;
}
.row {
  margin-top: 5px;
  margin-bottom: 5px;
}
.box {
  background-color: transparent !important;
  border-top: none !important;
}
.box-header {
  background-color: #3f72af;
  color: white;
  border-radius: 15px 15px 0 0;
  min-height: 50px;
  padding-top: 10px;
  font-size: auto;
  font-weight: bold;
  text-align: center;
}
.box-body {
  background-color: #f9f7f7;
  border-radius: 0 0 15px 15px;
  padding: 10px;
  overflow: hidden;
}
</style>
