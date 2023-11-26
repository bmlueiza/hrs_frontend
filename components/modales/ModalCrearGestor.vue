<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalCrearGestor"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Añadir nuevo gestor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <FormCrearGestor />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormCrearGestor from '@/components/formularios/FormCrearGestor.vue'

export default {
  components: {
    FormCrearGestor,
  },
  props: {
    mostrarModal: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    mostrarModal: function (nuevoValor) {
      // Abrir o cerrar el modal al cambiar la propiedad mostrarModal
      if (nuevoValor) {
        this.$el.classList.add('show') // Añadir la clase 'show' para mostrar el modal
      } else {
        this.$el.classList.remove('show') // Quitar la clase 'show' para ocultar el modal
      }
    },
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrarModal') // Emitir evento para cerrar el modal
    },
  },
}
</script>
