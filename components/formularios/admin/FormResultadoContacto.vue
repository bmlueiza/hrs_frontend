<template>
  <div class="FormResultadoContacto">
    <!--Aviso de resultado agregado correctamente-->
    <div class="avisos text-center">
      <div v-if="mensajeAviso" class="alert alert-success" role="alert">
        {{ mensajeAviso }}
      </div>
      <!--Aviso de error al agregar resultado-->
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        {{ mensajeError }}
      </div>
    </div>
    <form class="resultado">
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna - nombre-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label required" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              class="form-control"
              autocomplete="off"
              v-model="nuevoResultado.nombre"
              maxlength="50"
            />
          </div>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna - descripción-->
        <div class="col">
          <div class="form-outline">
            <label class="form-label" for="descripcion">Descripción</label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              class="form-control"
              placeholder="No obligatorio. Máximo 100 caracteres."
              v-model="nuevoResultado.descripcion"
              maxlength="100"
            ></textarea>
          </div>
        </div>
      </div>
      <!--Tercera fila-->
      <div class="row mt-3 text-center">
        <div class="col">
          <button
            type="submit"
            class="btn btn-primary"
            @click="agregarOActualizarResultado"
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
  name: 'FormResultadoContacto',
  data() {
    return {
      nuevoResultado: {
        nombre: '',
        descripcion: '',
      },
      //Mensajes de error y aviso
      mensajeAviso: '',
      mensajeError: '',
      //Variable para indicar si se está editando o agregando un resultado
      modoEditar: false,
    }
  },
  methods: {
    //Función para derivar a actualizar o agregar resultado
    agregarOActualizarResultado() {
      if (this.modoEditar) {
        this.actualizarResultado()
      } else {
        this.agregarResultado()
      }
    },
    //Función para agregar resultado
    agregarResultado() {
      if (this.validarFormulario()) {
        axios
          .post(
            this.$axios.defaults.baseURL + `resultados_contacto/`,
            this.nuevoResultado
          )
          .then((response) => {
            this.mensajeAviso = 'Resultado agregado correctamente.'
            this.mensajeError = ''
            this.nuevoResultado.nombre = ''
            this.nuevoResultado.descripcion = ''
          })
          .catch((error) => {
            this.mensajeAviso = ''
            this.mensajeError = 'Error al agregar resultado.'
            console.log(error)
          })
      }
    },
    //Función para actualizar resultado
    actualizarResultado() {
      if (this.validarFormulario()) {
        axios
          .put(
            this.$axios.defaults.baseURL + `resultados_contacto/${id}`,
            this.nuevoResultado
          )
          .then((response) => {
            this.mensajeAviso = 'Resultado actualizado correctamente.'
            this.mensajeError = ''
          })
          .catch((error) => {
            this.mensajeAviso = ''
            this.mensajeError = 'Error al actualizar resultado.'
            console.log(error)
          })
      }
    },
    //Función para cargar datos de resultado a editar
    cargarDatosResultado(id) {
      axios
        .get(this.$axios.defaults.baseURL + `resultados_contacto/${id}`)
        .then((response) => {
          this.nuevoResultado.nombre = response.data.nombre
          this.nuevoResultado.descripcion = response.data.descripcion
          this.modoEditar = true
        })
        .catch((error) => {
          console.error('Error al cargar datos para editar:', error)
        })
    },
    //Función para validar formulario
    validarFormulario() {
      if (this.nuevoResultado.nombre === '') {
        this.mensajeError = 'El campo Nombre es obligatorio.'
        return false
      } else {
        this.mensajeError = ''
        return true
      }
    },
    //Función para limpiar formulario
    async limpiarFormulario() {
      this.nuevoResultado.nombre = ''
      this.nuevoResultado.descripcion = ''

      this.mensajeAviso = ''
      this.mensajeError = ''
    },
  },
}
</script>
