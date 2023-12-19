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
          <!--
          <div class="col ms-auto">
            <label class="form-label" for="filtroRiesgo">Filtrar riesgo</label>
            <select
              id="filtroRiesgo"
              class="form-select"
              v-model="riesgoSeleccionado"
              @change="filtrarPorRiesgo"
            >
              <option
                v-for="riesgo in riesgos"
                :key="riesgo[0]"
                :value="riesgo[0]"
              >
                {{ riesgo[1] }}
              </option>
            </select>
          </div>
          <div class="col ms-auto">
            <label class="form-label" for="filtroDiagnostico"
              >Filtrar diagnóstico</label
            >
            <select
              id="filtroDiagnostico"
              class="form-select"
              v-model="diagnosticoSeleccionado"
            >
              <option
                v-for="diagnostico in diagnosticos"
                :key="diagnostico.id"
                :value="diagnostico.id"
              >
                {{ diagnostico.codigo }}
              </option>
            </select>
          </div>-->
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
import axios from 'axios'
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
      riesgos: [],
      diagnosticos: [],
      riesgoSeleccionado: '',
      diagnosticoSeleccionado: '',
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
    getRiesgos() {
      axios
        .get(this.$axios.defaults.baseURL + 'pacientes/riesgos')
        .then((response) => {
          this.riesgos = response.data
        })
        .catch((error) => {
          console.log('Error al obtener los datos de riesgos:', error)
        })
    },
    getDiagnosticos() {
      axios
        .get(this.$axios.defaults.baseURL + 'diagnosticos')
        .then((response) => {
          this.diagnosticos = response.data
        })
        .catch((error) => {
          console.log('Error al obtener los datos de diagnosticos:', error)
        })
    },
    filtrarPorRiesgo() {
      this.$nextTick(() => {
        this.$refs.tablaPacientes.filtrarPorRiesgo(riesgoSeleccionado)
      })
    },
  },
  mounted() {
    this.getRiesgos()
    this.getDiagnosticos()
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
