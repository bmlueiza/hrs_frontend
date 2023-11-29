<template>
  <div class="Gestores">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-lg-6 col-md-12 d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese el rut, nombre o apellido"
              id="buscarGestor"
              autocomplete="off"
              v-model="terminoBusqueda"
              @input="manejarInput"
            />
            <button
              @click="buscarGestores"
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
                Añadir gestor
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
      <section class="content">
        <!--Primera fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Gestores</h4>
              </div>
              <div class="box-body">
                <TablaGestores
                  ref="tablaGestores"
                  @actualizarTabla="actualizarTabla"
                  :terminoBusqueda="terminoBusqueda"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TablaGestores from '@/components/tablas/TablaGestores.vue'
import Modal from '@/components/modales/Modal.vue'
import FormCrearGestor from '@/components/formularios/FormCrearGestor.vue'

export default {
  components: {
    Navbar,
    TablaGestores,
    Modal,
    FormCrearGestor,
  },
  data() {
    return {
      terminoBusqueda: '',
      todosLosGestores: [],
      mostrarModal: false,
      modalId: 'modalId',
      modalTitle: 'Añadir nuevo gestor',
      componenteFormulario: FormCrearGestor,
    }
  },
  methods: {
    async manejarInput() {
      // Verificar si el campo está vacío y actualizar la tabla en ese caso
      if (this.terminoBusqueda.trim() === '') {
        this.$nextTick(() => {
          this.$refs.tablaGestores.actualizarTabla()
        })
      }
    },
    async buscarGestores() {
      this.$nextTick(() => {
        this.$refs.tablaGestores.actualizarTabla()
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
        this.$refs.tablaGestores.actualizarTabla()
      })
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
