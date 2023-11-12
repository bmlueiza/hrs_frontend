<template>
  <div>
    <Navbar />
    <div class="container">
      <h2>Nombre del paciente</h2>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="column datos-paciente">
          <h4>Datos del paciente</h4>
        </div>
        <!--Segunda columna-->
        <div class="column diagnosticos">
          <h4>Diagnósticos</h4>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Segunda columna-->
        <div class="column seguimiento">
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
      </div>
      <!--Tercera fila-->
      <div class="row">
        <!--Segunda columna-->
        <div class="column observaciones">
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
  </div>
</template>

<style>
.container {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: grid;
  grid-template-columns: minmax(auto, 1fr) 1fr;
  grid-gap: auto;
}
.column {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
h2 {
  text-align: center;
  grid-column: span 2;
}
.datos-paciente {
  grid-row: 1;
  grid-column: 1;
}
.diagnosticos {
  grid-row: 1;
  grid-column: 2;
}
.seguimiento {
  grid-row: 2;
  grid-column: 2;
}
.observaciones {
  grid-row: 3;
  grid-column: 2;
}
</style>
