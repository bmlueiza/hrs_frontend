<template>
  <div>
    <Navbar />
    <div class="container px-4">
      <h2 class="text-center">Nombre del paciente</h2>
      <!--Primera fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col">
          <div class="datos-paciente">
            <h4>Datos del paciente</h4>
            <p>Nombre:</p>
            <p>RUT:</p>
            <p>Fecha de nacimiento:</p>
          </div>
        </div>
        <!--Segunda columna-->
        <div class="buttons-container d-grid gap-2 col mx-auto">
          <button type="button" class="btn btn-primary">
            Añadir intento de contacto
          </button>
          <button type="button" class="btn btn-primary">
            Añadir observación
          </button>
          <button type="button" class="btn btn-primary">
            Actualizar información del paciente
          </button>
        </div>
      </div>
      <!--Segunda fila-->
      <div class="row">
        <!--Primera columna-->
        <div class="col mr-4">
          <div class="diagnosticos">
            <h4>Diagnósticos</h4>
          </div>
        </div>
        <!--Segunda columna-->
        <div class="col">
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
        <!--Primera columna-->
        <div class="col">
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
    </div>
  </div>
</template>

<style>
.container {
  background-color: #dbe2ef;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px auto;
  padding: 20px;
}
.col-sm-6,
.col {
  background: #f9f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.buttons-container {
  background: none;
  border: none;
  padding: 10px;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
