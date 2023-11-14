<template>
  <div>
    <Navbar />
    <div class="container">
      <h2 class="text-center">Añadir nuevo gestor</h2>
      <FormNuevoGestor />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import FormNuevoGestor from '@/components/FormNuevoGestor.vue'

export default {
  components: {
    Navbar,
    FormNuevoGestor,
  },
}
</script>
