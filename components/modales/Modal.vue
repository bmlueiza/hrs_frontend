<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalId"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <component v-if="componenteFormulario" :is="componenteFormulario" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    componenteFormulario: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.modal-header {
  background-color: #3f72af;
  color: white;
}
</style>
