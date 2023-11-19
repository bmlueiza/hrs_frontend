<template>
  <div>
    <Navbar />
    <div class="container">
      <h2 class="text-center">Añadir nuevo gestor</h2>
      <FormCrearGestor />
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
