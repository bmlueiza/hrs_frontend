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
                    <h4 class="box-title">Resultados de contacto</h4>
                  </div>
                  <div class="col-auto ms-auto">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${modalId}`"
                      @click="
                        abrirModal(
                          'FormResultadoContacto',
                          'Añadir resultado de contacto'
                        )
                      "
                    >
                      Añadir resultado
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-body">
                <TablaResultadosContacto class="max-table" />
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
                          'FormResultadoContacto',
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
import TablaResultadosContacto from '@/components/tablas/admin/TablaResultadosContacto.vue'
import TablaAccionesGestor from '@/components/tablas/admin/TablaAccionesGestor.vue'
import TablaActividadesMedicas from '@/components/tablas/admin/TablaActividadesMedicas.vue'
//Formularios
import FormResultadoContacto from '@/components/formularios/admin/FormResultadoContacto.vue'
import FormAccionGestor from '@/components/formularios/admin/FormAccionGestor.vue'

export default {
  components: {
    Navbar,
    Modal,
    TablaResultadosContacto,
    TablaAccionesGestor,
    TablaActividadesMedicas,
    FormResultadoContacto,
    FormAccionGestor,
  },
  data() {
    return {
      modalId: 'modalId',
      modalTitle: '',
      currentComponent: null,
    }
  },
  methods: {
    abrirModal(componente, titulo) {
      switch (componente) {
        case 'FormResultadoContacto':
          this.currentComponent = FormResultadoContacto
          break
        case 'FormAccionGestor':
          this.currentComponent = FormAccionGestor
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
.container-fluid {
  position: relative;
  border-radius: 3px;
  background: #dbe2ef;
  border-top: 3px solid #d2d6de;
  margin: 10px auto;
  width: 100%;
  padding: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
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
