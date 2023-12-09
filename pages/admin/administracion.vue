<template>
  <div class="administracion">
    <Navbar />
    <div class="container-fluid">
      <section class="content-header">
        <h1>Panel de administración</h1>
      </section>
      <section class="content">
        <!--Primera fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col">
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
                        abrilModal(
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
          <div class="col">
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
                        abrilModal(
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
      </section>
      <!--Modal-->
      <Modal
        :modalTitle="modalTitle"
        :componenteFormulario="currentComponent"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TablaResultadosContacto from '@/components/tablas/TablaResultadosContacto.vue'
import TablaAccionesGestor from '@/components/tablas/TablaAccionesGestor.vue'
import Modal from '@/components/modales/Modal.vue'
import FormResultadoContacto from '@/components/formularios/admin/FormResultadoContacto.vue'
import FormAccionGestor from '@/components/formularios/admin/FormAccionGestor.vue'

export default {
  components: {
    Navbar,
    TablaResultadosContacto,
    TablaAccionesGestor,
    Modal,
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
    abrilModal(componente, titulo) {
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
</style>
<style>
h1 {
  font-style: italic;
  border-bottom: 1px solid #ccc;
}
.max-table {
  max-height: 200px;
}
</style>
