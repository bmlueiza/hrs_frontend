<template>
  <div>
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre"
              id="buscarPaciente"
            />
          </div>
          <div class="col-xs-12 col-md-9 d-flex justify-content-end">
            <div class="btn-group pull-right">
              <button type="button" class="btn btn-secondary">
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
                <TablaPacientes />
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
}
</script>
