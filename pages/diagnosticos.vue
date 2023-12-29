<template>
  <div class="Diagnosticos">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-lg-6 col-md-12 d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre o código"
              id="buscarDiagnostico"
              v-model="terminoBusqueda"
              autocomplete="off"
              @input="manejarInput"
            />
            <button
              @click="buscarDiagnosticos"
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
            v-if="this.gestorInfo.admin"
            class="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start mt-3 mt-md-0"
          >
            <div class="btn-group pull-right">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-toggle="modal"
                :data-bs-target="`#${modalId}`"
              >
                Añadir diagnóstico
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
      <!-- Listado de Diagnósticos-->
      <section class="content">
        <!--Primera fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Diagnósticos</h4>
              </div>
              <div class="box-body">
                <TablaDiagnosticos
                  ref="tablaDiagnosticos"
                  @actualizarTabla="actualizarTabla"
                  :terminoBusqueda="terminoBusqueda"
                  :gestorInfo="gestorInfo"
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
import Modal from '@/components/modales/Modal.vue'
import TablaDiagnosticos from '@/components/tablas/TablaDiagnosticos.vue'
import FormDiagnostico from '@/components/formularios/FormDiagnostico.vue'

export default {
  components: {
    Navbar,
    Modal,
    TablaDiagnosticos,
    FormDiagnostico,
  },
  data() {
    return {
      //Gestor
      gestorInfo: '',
      gestorID: '',
      //Buscador
      terminoBusqueda: '',
      //Modal
      mostrarModal: false,
      modalId: 'modalId',
      modalTitle: 'Añadir nuevo diagnóstico',
      componenteFormulario: FormDiagnostico,
    }
  },
  mounted() {
    this.cargarGestor()
  },
  methods: {
    async cargarGestor() {
      try {
        const gestorInfoString = localStorage.getItem('gestor')

        if (gestorInfoString) {
          this.gestorInfo = JSON.parse(gestorInfoString)
          this.gestorID = JSON.parse(gestorInfoString).id
        }
      } catch (error) {
        console.log('Error al cargar el gestor', error)
      }
    },

    async buscarDiagnosticos() {
      this.$nextTick(() => {
        this.$refs.tablaDiagnosticos.actualizarTabla()
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
        this.$refs.tablaDiagnosticos.actualizarTabla()
      })
    },
    async manejarInput() {
      // Verificar si el campo está vacío y actualizar la tabla en ese caso
      if (this.terminoBusqueda.trim() === '') {
        this.$nextTick(() => {
          this.$refs.tablaDiagnosticos.actualizarTabla()
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
