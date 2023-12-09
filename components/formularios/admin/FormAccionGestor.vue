<template>
  <div class="FormAccionGestor">
    <!--Aviso de accion agregada correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error al agregar accion-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="accion">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevaAccion.nombre"
              maxlength="50"
              required
            />
          </div>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - estado-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="estado">Activo</label>
            <!--Checkbox-->
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="estado"
                name="estado"
                v-model="nuevaAccion.estado"
              />
            </div>
          </div>
        </div>
        <!--Fin primera columna-->
      </div>
      <!--Tercera fila-->
      <div class="row mt-3 text-center">
        <div class="col">
          <button
            type="button"
            class="btn btn-primary"
            @click="agregarOActualizarAccion"
          >
            {{ modoEditar ? 'Actualizar' : 'Agregar' }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="limpiarFormulario"
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'FormAccionGestor',
  data() {
    return {
      nuevaAccion: {
        nombre: '',
        estado: true,
      },
      //Indica si se está editando o agregando una accion
      modoEditar: false,
      //Mensajes de error y aviso
      mensajeAviso: '',
      mensajeError: '',
    }
  },
  methods: {
    //Funcion para agregar o actualizar una accion
    agregarOActualizarAccion() {
      if (this.validarFormulario()) {
        if (this.modoEditar) {
          axios
            .put(
              this.$axios.defaults.baseURL +
                '/acciones_gestor/' +
                this.nuevaAccion.id,
              this.nuevaAccion
            )
            .then((response) => {
              this.limpiarFormulario()
              this.mensajeAviso = 'Acción actualizada correctamente'
            })
            .catch((error) => {
              this.mensajeAviso = ''
              this.mensajeError = 'Error al actualizar acción'
              console.log(error)
            })
        } else {
          axios
            .post(
              this.$axios.defaults.baseURL + '/acciones_gestor',
              this.nuevaAccion
            )
            .then((response) => {
              this.limpiarFormulario()
              this.mensajeAviso = 'Acción agregada correctamente'
            })
            .catch((error) => {
              this.mensajeAviso = ''
              this.mensajeError = 'Error al agregar acción'
              console.log(error)
            })
        }
      }
    },
    //Funcion para validar formulario
    validarFormulario() {
      if (this.nuevaAccion.nombre.trim() === '') {
        this.mensajeError = 'Debe ingresar un nombre'
        return false
      }
      return true
    },
    //Funcion para limpiar formulario
    limpiarFormulario() {
      this.nuevaAccion.nombre = ''
      this.nuevaAccion.estado = true
      this.mensajeAviso = ''
      this.mensajeError = ''
      this.modoEditar = false
    },
  },
}
</script>
