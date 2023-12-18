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
              placeholder="Ingrese el rut, nombre o apellido"
              id="buscarPaciente"
              autocomplete="off"
              v-model="terminoBusqueda"
              @input="manejarInput"
            />
            <button
              @click="buscarPacientes"
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
          <div class="col ms-auto">
            <select class="form-select" aria-label="Default select example">
              <option selected>Filtrar por riesgo</option>
            </select>
          </div>
          <div class="col ms-auto">
            <select class="form-select" aria-label="Default select example">
              <option selected>Filtrar por diagnóstico</option>
            </select>
          </div>
          <div class="col-auto ms-auto">
            <div class="btn-group pull-right">
              <button
                @click="irIngresarPaciente"
                type="button"
                class="btn btn-dark"
              >
                Ingresar paciente
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content-header -->
      <!-- Listado de Pacientes-->
      <section class="content">
        <div class="row">
          <div class="col-12">
            <div class="box">
              <div class="box-header with-border">
                <div class="row">
                  <div class="col">
                    <h4 class="box-title">Listado de Pacientes</h4>
                  </div>
                  <div class="col-2 ms-auto">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Filtrar por riesgo</option>
                    </select>
                  </div>
                  <div class="col-2 ms-auto">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Filtrar por diagnóstico</option>
                    </select>
                  </div>
                </div>
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
    manejarInput() {
      // Verificar si el campo está vacío y actualizar la tabla en ese caso
      if (this.terminoBusqueda.trim() === '') {
        this.$nextTick(() => {
          this.$refs.tablaPacientes.actualizarTabla()
        })
      }
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
<style scoped>
.select,
.form-control,
.form-select {
  height: fit-content !important;
  align-self: center !important;
}
.container-fluid {
  position: relative;
  border-radius: 3px;
  margin: 10px auto;
  width: 100%;
  padding: 20px;
}
</style>
