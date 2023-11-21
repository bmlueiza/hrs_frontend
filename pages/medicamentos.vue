<template>
  <div class="Medicamentos">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre"
              id="buscarMedicamento"
            />
          </div>
          <div class="col-xs-12 col-md-9 d-flex justify-content-end">
            <div class="btn-group pull-right">
              <button type="button" class="btn btn-secondary">
                Añadir medicamento
              </button>
            </div>
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
                <TablaMedicamentos />
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
import TablaMedicamentos from '@/components/tablas/TablaMedicamentos.vue'

export default {
  components: {
    Navbar,
    TablaMedicamentos,
  },
}
</script>
