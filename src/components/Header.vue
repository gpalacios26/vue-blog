<template>
  <header id="header">
    <div class="center">
      <div id="logo">
        <img src="../assets/logo.png" class="app-logo" alt="Logotipo" />
        <span id="brand">
          <strong>Curso</strong>Vue
        </span>
      </div>
      <nav id="menu">
        <ul>
          <li>
            <router-link to="/home" active-class="active">Inicio</router-link>
          </li>
          <li>
            <router-link to="/blog" active-class="active">Blog</router-link>
          </li>
          <li>
            <router-link to="/formulario" active-class="active">Formulario</router-link>
          </li>
          <li>
            <router-link to="/peliculas" active-class="active">Películas</router-link>
          </li>
          <li>
            <router-link to="/pagina" active-class="active">Página</router-link>
          </li>
        </ul>
      </nav>
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>