<template>
  <div class="componente">
    <hr />
    <h1>Este es Mi Componente Vue</h1>
    <h2>{{ subtitulo }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "MiComponente",
  data() {
    return {
      subtitulo: "Soy el subtitulo del componente",
    };
  },
};
</script>