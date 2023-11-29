<template>
  <div class="Medicamentos">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-lg-6 col-md-12 d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre o código"
              id="buscarMedicamento"
              v-model="terminoBusqueda"
              @input="manejarInput"
            />
            <button
              @click="buscarMedicamentos"
              class="btn btn-primary"
              type="button"
              :disabled="terminoBusqueda.trim() === ''"
            >
              Buscar
            </button>
            <button
              @click="limpiarBusqueda"
              class="btn btn-primary"
              type="button"
              :disabled="terminoBusqueda.trim() === ''"
            >
              Cancelar
            </button>
          </div>
          <div
            class="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start mt-3 mt-md-0"
          >
            <div class="btn-group pull-right">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                :data-bs-target="`#${modalId}`"
              >
                Añadir medicamento
              </button>
            </div>
            <Modal
              ref="modal"
              :modalId="modalId"
              :modalTitle="modalTitle"
              :componenteFormulario="componenteFormulario"
              :mostrarModal="mostrarModal"
            />
          </div>
        </div>
      </section>
      <!-- /.content-header -->
      <!-- Listado de Medicamentos-->
      <section class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Medicamentos</h4>
              </div>
              <div class="box-body">
                <TablaMedicamentos
                  ref="tablaMedicamentos"
                  @actualizarTabla="actualizarTabla"
                  :terminoBusqueda="terminoBusqueda"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content -->
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/modales/Modal.vue'
import TablaMedicamentos from '@/components/tablas/TablaMedicamentos.vue'
import FormCrearMedicamento from '@/components/formularios/crear/FormCrearMedicamento.vue'

export default {
  components: {
    Navbar,
    Modal,
    TablaMedicamentos,
    FormCrearMedicamento,
  },
  data() {
    return {
      terminoBusqueda: '',
      mostrarModal: false,
      modalId: 'modalId',
      modalTitle: 'Añadir nuevo medicamento',
      componenteFormulario: FormCrearMedicamento,
    }
  },
  methods: {
    async buscarMedicamentos() {
      this.$nextTick(() => {
        this.$refs.tablaMedicamentos.actualizarTabla()
      })
    },
    actualizarTabla() {
      this.tablaActualizada = true
      this.$nextTick(() => {
        this.tablaActualizada = false
      })
    },
    async limpiarBusqueda() {
      this.terminoBusqueda = ''
      this.$nextTick(() => {
        this.$refs.tablaMedicamentos.actualizarTabla()
      })
    },
    async manejarInput() {
      if (this.terminoBusqueda.trim() === '') {
        this.$nextTick(() => {
          this.$refs.tablaMedicamentos.actualizarTabla()
        })
      }
    },
  },
}
</script>
<style scoped>
.form-control {
  height: fit-content !important;
  align-self: center;
}
</style>
