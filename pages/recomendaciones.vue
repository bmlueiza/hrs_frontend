<template>
  <div class="Recomendaciones">
    <Navbar />
    <div class="container">
      <section class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h4 class="box-title">Listado de Recomendaciones</h4>
              </div>
              <div class="box-body">
                <TablaRecomendaciones />
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
import TablaRecomendaciones from '@/components/tablas/TablaRecomendaciones.vue'

export default {
  components: {
    Navbar,
    TablaRecomendaciones,
  },
}
</script>
