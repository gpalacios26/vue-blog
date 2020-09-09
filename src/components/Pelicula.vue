<template>
  <article class="article-item">
    <div class="image-wrap">
      <img :src="pelicula.image" :alt="pelicula.title" />
    </div>
    <h2>{{pelicula.title}}</h2>
    <a href="#">Leer más</a>
    <input type="button" value="Marcar como favorita" @click="pasarFavoritaAlPadre(pelicula)" />

    <span
      class="date"
      :class="{
              'year-green': pelicula.year >= 2016,
              'year-red': pelicula.year < 2016
            }"
    >{{pelicula.year}}</span>

    <div class="clearfix"></div>
  </article>
</template>

<script>
export default {
  name: "Pelicula",
  props: ["pelicula"],
  methods: {
    pasarFavoritaAlPadre(pelicula) {
      this.$emit('favorita', pelicula);
    },
  },
};
</script>