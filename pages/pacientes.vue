<template>
  <div>
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-lg-6 col-md-12 d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese los nombres o apellidos"
              id="buscarPaciente"
              autocomplete="off"
              v-model="terminoBusqueda"
            />
            <button
              @click="buscarPacientes"
              class="btn btn-secondary"
              type="button"
            >
              Buscar
            </button>
            <button
              @click="limpiarBusqueda"
              class="btn btn-secondary"
              type="button"
            >
              Cancelar
            </button>
          </div>
          <div
            class="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start mt-3 mt-md-0"
          >
            <div class="btn-group pull-right">
              <button
                @click="irIngresarPaciente"
                type="button"
                class="btn btn-secondary"
              >
                Añadir paciente
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content-header -->
      <!-- Listado de Pacientes-->
      <section class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Pacientes</h4>
              </div>
              <div class="box-body">
                <TablaPacientes
                  ref="tablaPacientes"
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
import TablaPacientes from '@/components/tablas/TablaPacientes.vue'

export default {
  components: {
    Navbar,
    TablaPacientes,
  },
  data() {
    return {
      terminoBusqueda: '',
      tablaActualizada: false,
    }
  },
  methods: {
    irIngresarPaciente() {
      this.$router.push('/ingresarPaciente')
    },
    buscarPacientes() {
      this.$nextTick(() => {
        this.$refs.tablaPacientes.actualizarTabla()
      })
    },
    actualizarTabla() {
      this.tablaActualizada = true
      this.$nextTick(() => {
        this.tablaActualizada = false
      })
    },
    limpiarBusqueda() {
      this.terminoBusqueda = ''
      this.$nextTick(() => {
        this.$refs.tablaPacientes.actualizarTabla()
      })
    },
  },
}
</script>
