<template>
  <div>
    <Navbar />
    <div class="container">
      <section class="content">
        <h4><span>Añadir nuevo gestor</span></h4>
        <div class="box">
          <div class="box-header with-border">
            <h5 class="box-title">Datos del gestor</h5>
          </div>
          <div class="box-body">
            <FormCrearGestor />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import FormCrearGestor from '@/components/formularios/FormCrearGestor.vue'

export default {
  components: {
    Navbar,
    FormCrearGestor,
  },
}
</script>

<style>
.content span {
  font-size: 30px;
  font-style: italic;
}
</style>
