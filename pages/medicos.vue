<template>
  <div class="médicos">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre"
              id="buscarMédico"
            />
          </div>
          <div class="col-xs-12 col-md-9 d-flex justify-content-end">
            <div class="btn-group pull-right">
              <button type="button" class="btn btn-secondary">
                Añadir médico
              </button>
            </div>
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
                <TablaMedicos />
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
import TablaMedicos from '@/components/tablas/TablaMedicos.vue'

export default {
  components: {
    Navbar,
    TablaMedicos,
  },
}
</script>

<style>
.header {
  position: sticky;
  top: 0;
}
</style>
