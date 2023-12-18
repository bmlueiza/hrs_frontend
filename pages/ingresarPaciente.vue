<template>
  <div>
    <Navbar />
    <div class="container">
      <section class="content">
        <h4>Ingresar nuevo paciente</h4>
        <div class="box">
          <div class="box-header with-border">
            <h5 class="box-title">Datos del paciente</h5>
          </div>
          <div class="box-body">
            <FormCrearPaciente />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import FormCrearPaciente from '@/components/formularios/FormCrearPaciente.vue'

export default {
  components: {
    Navbar,
    FormCrearPaciente,
  },
}
</script>

<style scoped>
.content h4 {
  font-size: 30px;
  font-style: italic;
  color: #dbe2ef;
}
.content {
  padding-top: 0;
}
.box {
  background-color: #dbe2ef;
}
</style>
