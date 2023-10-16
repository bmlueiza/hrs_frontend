<template>
  <div>
    <Navbar />
    <div class="table-responsive">
      <table class="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th class="header" scope="col">#</th>
            <th class="header" scope="col">Nombres</th>
            <th class="header" scope="col">1° Apellido</th>
            <th class="header" scope="col">2° Apellido</th>
            <th class="header" scope="col">RUT</th>
            <th class="header" scope="col">Teléfono</th>
            <th class="header" scope="col">Dirección</th>
            <th class="header" scope="col">Riesgo</th>
            <th class="header" scope="col">Diagnóstico</th>
            <th class="header" scope="col">Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script></script>

<style>
.header {
  position: sticky;
  top: 0;
}
</style>
