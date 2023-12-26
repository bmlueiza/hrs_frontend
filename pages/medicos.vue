<template>
  <div class="medicos">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-lg-6 col-md-12 d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por rut, nombre, apellido o especialidad"
              id="buscarMédico"
              v-model="terminoBusqueda"
              autocomplete="off"
              @input="manejarInput"
            />
            <button
              @click="buscarMedicos"
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
            v-if="this.usuario.admin"
            class="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start mt-3 mt-md-0"
          >
            <div class="btn-group pull-right">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-toggle="modal"
                :data-bs-target="`#${modalId}`"
              >
                Añadir médico
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
      <!-- Listado de Médicos-->
      <section class="content">
        <!--Primera fila-->
        <div class="row">
          <!--Primera columna-->
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Médicos</h4>
              </div>
              <div class="box-body">
                <TablaMedicos
                  ref="tablaMedicos"
                  @actualizarTabla="actualizarTabla"
                  :terminoBusqueda="terminoBusqueda"
                  :usuario="usuario"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.container -->
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/modales/Modal.vue'
import TablaMedicos from '@/components/tablas/TablaMedicos.vue'
import FormMedico from '@/components/formularios/FormMedico.vue'

export default {
  components: {
    Navbar,
    Modal,
    TablaMedicos,
    FormMedico,
  },
  data() {
    return {
      //Usuario logueado
      usuario: '',
      //Buscador
      terminoBusqueda: '',
      //Modal
      mostrarModal: false,
      modalId: 'modalId',
      modalTitle: 'Añadir nuevo médico',
      componenteFormulario: FormMedico,
    }
  },
  mounted() {
    this.cargarUsuario()
  },
  methods: {
    async cargarUsuario() {
      try {
        const usuarioInfoString = localStorage.getItem('gestor')

        if (usuarioInfoString) {
          this.usuario = JSON.parse(usuarioInfoString)
        }
      } catch (error) {
        console.log('Error al cargar el usuario', error)
      }
    },
    async buscarMedicos() {
      this.$nextTick(() => {
        this.$refs.tablaMedicos.buscarMedicos(this.terminoBusqueda)
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
        this.$refs.tablaMedicos.actualizarTabla(this.terminoBusqueda)
      })
    },
    async manejarInput() {
      if (this.terminoBusqueda.trim() === '') {
        this.$nextTick(() => {
          this.$refs.tablaMedicos.actualizarTabla(this.terminoBusqueda)
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
