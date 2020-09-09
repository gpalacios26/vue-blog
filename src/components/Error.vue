<template>
    <div id="pagina-error">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Página no encontrada</h2>
        <p>La página que buscas no existe</p>
      </section>
      <SidebarComponent></SidebarComponent>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./Sidebar.vue";

export default {
  name: "ErrorComponent",
  components: {
    SidebarComponent,
  },
};
</script>