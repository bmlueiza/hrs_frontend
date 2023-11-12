<template>
  <div>
    <Navbar />
    <div class="container">
      <h2>Nombre del paciente</h2>
      <!--Primera fila-->
      <!--Primera columna-->
      <div class="datos-paciente">
        <h4>Datos del paciente</h4>
        <p>Nombre:</p>
        <p>RUT:</p>
        <p>Fecha de nacimiento:</p>
      </div>
      <!--Segunda columna-->
      <div class="buttons">
        <button type="submit" class="btn btn-primary btn-block mb-10">
          Añadir intento de contacto
        </button>
        <button type="submit" class="btn btn-primary btn-block mb-10">
          Añadir observación
        </button>
        <button type="submit" class="btn btn-primary btn-block mb-10">
          Actualizar información del paciente
        </button>
      </div>
      <!--Segunda fila-->
      <!--Primera columna-->
      <div class="diagnosticos">
        <h4>Diagnósticos</h4>
      </div>
      <!--Segunda columna-->
      <div class="seguimiento">
        <h4>Seguimiento</h4>
        <div class="table-responsive">
          <table class="table table-light table-striped table-bordered">
            <!--Cabecera de la tabla Seguimiento-->
            <thead>
              <tr>
                <th class="header" scope="col">Fecha de contacto</th>
                <th class="header" scope="col">Tipo</th>
                <th class="header" scope="col">Resultado</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <!--Tercera fila-->
      <!--Primera columna-->
      <div class="observaciones">
        <h4>Observaciones</h4>
        <div class="table-responsive">
          <table class="table table-light table-striped table-bordered">
            <!--Cabecera de la tabla Observaciones-->
            <thead>
              <tr>
                <th class="header" scope="col">Observacion</th>
                <th class="header" scope="col">Fecha</th>
                <th class="header" scope="col">Gestor</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  background-color: #dbe2ef;
  max-width: 90%;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 10px;
}
.container div {
  background: #f9f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
h2 {
  text-align: center;
  grid-column: span 2;
}
.datos-paciente {
  grid-row: 2;
  grid-column: 1;
}
.buttons {
  grid-row: 2;
  grid-column: 2;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.diagnosticos {
  grid-row: 3;
  grid-column: 1;
}
.seguimiento {
  grid-row: 3;
  grid-column: 2;
}
.observaciones {
  grid-row: 4;
  grid-column: span 2;
}
</style>
