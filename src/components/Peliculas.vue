<template>
  <div id="peliculas">
    <SliderComponent texto="Películas" home="false"></SliderComponent>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Películas</h2>
        <p v-if="favorita">Mi película favorita es {{favorita.title}}</p>
        <div id="articles">
          <div v-for="pelicula in peliculasMayuscula" v-bind:key="pelicula.title">
            <Pelicula :pelicula="pelicula" @favorita="miPeliculaFavorita"></Pelicula>
          </div>
        </div>
      </section>
      <SidebarComponent></SidebarComponent>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import SliderComponent from "./Slider.vue";
import SidebarComponent from "./Sidebar.vue";
import Pelicula from "./Pelicula.vue";

export default {
  name: "Peliculas",
  components: {
    SliderComponent,
    SidebarComponent,
    Pelicula,
  },
  methods: {
    miPeliculaFavorita(favorita) {
      this.favorita = favorita;
    },
  },
  computed: {
    peliculasMayuscula() {
      var peliculasMod = this.peliculas;
      for (var i = 0; i < peliculasMod.length; i++) {
        peliculasMod[i].title = peliculasMod[i].title.toUpperCase();
      }
      return peliculasMod;
    },
  },
  data() {
    return {
      favorita: null,
      peliculas: [
        {
          title: "Spiderman 4",
          year: 2017,
          image:
            "https://wipy.tv/wp-content/uploads/2020/03/venom-apareceria-en-spider-man-4.jpg",
        },
        {
          title: "Los Vengadores Endgame",
          year: 2016,
          image:
            "https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/OF2GHTEXJFBSVNCTNCUES4ESAQ.jpg",
        },
        {
          title: "Batman vs Superman",
          year: 2015,
          image: "https://i.ytimg.com/vi/Vzi5Q5aIGJU/maxresdefault.jpg",
        },
      ],
    };
  },
};
</script>