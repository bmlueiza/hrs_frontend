<template>
  <div class="Gestores">
    <Navbar />
    <div class="container">
      <section class="content-header">
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por nombre"
              id="buscarGestor"
            />
          </div>
          <div class="col-xs-12 col-md-9 d-flex justify-content-end">
            <div class="btn-group pull-right">
              <button
                @click="irANuevoGestor"
                type="button"
                class="btn btn-secondary"
              >
                Añadir gestor
              </button>
            </div>
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
                <TablaGestores />
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

export default {
  components: {
    Navbar,
    TablaGestores,
  },
  data() {
    return {
      todosLosGestores: [],
    }
  },
  methods: {
    irANuevoGestor() {
      this.$router.push('/admin/nuevoGestor')
    },
  },
}
</script>
