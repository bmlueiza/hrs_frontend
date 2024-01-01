<template>
  <div class="administracion">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <h1>Panel de administración</h1>
      </section>
      <section class="content">
        <!--Primera fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col mb-1">
            <div class="box">
              <div class="box-header with-border">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="box-title">Especialidades</h4>
                  </div>
                  <div class="col-auto ms-auto">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${modalId}`"
                      @click="
                        abrirModal(
                          'FormEspecialidad',
                          'Añadir una especialidad'
                        )
                      "
                    >
                      Añadir una especialidad
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-body">
                <TablaEspecialidades class="max-table" />
              </div>
            </div>
          </div>
          <!--Fin primera columna-->
          <!--Segunda columna-->
          <div class="col mb-1">
            <div class="box">
              <div class="box-header with-border">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="box-title">Acciones permitidas a un gestor</h4>
                  </div>
                  <div class="col-auto ms-auto">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${modalId}`"
                      @click="
                        abrirModal(
                          'FormAccionGestor',
                          'Añadir acción del gestor'
                        )
                      "
                    >
                      Añadir acción
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-body">
                <TablaAccionesGestor class="max-table" />
              </div>
            </div>
          </div>
          <!--Fin segunda columna-->
        </div>
        <!--Fin primera fila-->
        <!--Segunda fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col">
            <div class="box">
              <div class="box-header with-border">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="box-title">Actividades médicas</h4>
                  </div>
                  <div class="col-auto ms-auto">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${modalId}`"
                      @click="
                        abrirModal(
                          'FormActividadMedica',
                          'Añadir actividad médica'
                        )
                      "
                    >
                      Añadir actividad
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-body">
                <TablaActividadesMedicas class="max-table" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Modal-->
      <Modal
        :modalId="modalId"
        :modalTitle="modalTitle"
        :componenteFormulario="currentComponent"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/modales/Modal.vue'
//Tablas
import TablaEspecialidades from '@/components/tablas/admin/TablaEspecialidades.vue'
import TablaAccionesGestor from '@/components/tablas/admin/TablaAccionesGestor.vue'
import TablaActividadesMedicas from '@/components/tablas/admin/TablaActividadesMedicas.vue'
//Formularios
import FormEspecialidad from '@/components/formularios/admin/FormEspecialidad.vue'
import FormAccionGestor from '@/components/formularios/admin/FormAccionGestor.vue'
import FormActividadMedica from '@/components/formularios/admin/FormActividadMedica.vue'

export default {
  components: {
    Navbar,
    Modal,
    TablaEspecialidades,
    TablaAccionesGestor,
    TablaActividadesMedicas,
    FormEspecialidad,
    FormAccionGestor,
    FormActividadMedica,
  },
  data() {
    return {
      modalId: 'modalId',
      modalTitle: '',
      currentComponent: {},
    }
  },
  methods: {
    abrirModal(componente, titulo) {
      switch (componente) {
        case 'FormEspecialidad':
          this.currentComponent = FormEspecialidad
          break
        case 'FormAccionGestor':
          this.currentComponent = FormAccionGestor
          break
        case 'FormActividadMedica':
          this.currentComponent = FormActividadMedica
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
h1 {
  font-style: italic;
  border-bottom: 1px solid #ccc;
  color: #d2d6de;
}
.max-table {
  max-height: 200px;
  overflow-y: scroll;
}
</style>
