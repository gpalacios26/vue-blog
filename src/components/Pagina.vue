<template>
  <div id="pagina">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Página</h2>
        <button @click="redirigirAlBlog()">Redirigir al Blog</button>
        <p v-if="id_desde_url">El parametro es {{id_desde_url}}</p>
        <hr />
        <h2>Reactividad</h2>
        <input type="text" v-model="nombre" />
        <p v-if="nombre">Mi nombre es {{nombre}}</p>
        <h2>Directivas condicionales</h2>
        <input type="number" v-model="edad" />
        <p v-if="edad">Mi edad es {{edad}}</p>
        <p v-if="edad && edad>=18">Eres mayor de edad</p>
        <p v-else>Eres menor de edad</p>
        <h2>Directiva iterativa</h2>
        <ol>
          <li v-for="pelicula in peliculas" v-bind:key="pelicula">{{pelicula}}</li>
        </ol>
      </section>
      <SidebarComponent></SidebarComponent>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./Sidebar.vue";

export default {
  name: "Pagina",
  components: {
    SidebarComponent,
  },
  mounted() {
    this.id_desde_url = this.$route.params.id;
  },
  data() {
    return {
      id_desde_url: null,
      nombre: "Gregory Palacios",
      edad: 18,
      peliculas: ["Batman vs Superman", "El Señor de los Anillos", "Spiderman"],
    };
  },
  methods: {
    redirigirAlBlog() {
      this.$router.push("/blog");
    },
  },
};
</script>