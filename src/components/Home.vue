<template>
  <div id="home">
    <SliderComponent texto="Bienvenido al Curso de Vue" home="true"></SliderComponent>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Últimos artículos</h2>
        <div id="articles" v-if="articles">
          <Articles :articles="articles"></Articles>
        </div>
        <div v-if="!articles">
          <h2>Cargando...</h2>
        </div>
      </section>
      <SidebarComponent></SidebarComponent>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from "../Global";
import SliderComponent from "./Slider.vue";
import SidebarComponent from "./Sidebar.vue";
import Articles from "./Articles.vue";

export default {
  name: "Home",
  components: {
    SliderComponent,
    SidebarComponent,
    Articles,
  },
  mounted() {
    this.getLastArticles();
  },
  data() {
    return {
      url: Global.url,
      articles: null,
    };
  },
  methods: {
    getLastArticles() {
      axios
        .get(this.url + "articles/true")
        .then((res) => {
          if (res.data.status == "success") {
            this.articles = res.data.articles;
          } else {
            this.articles = [];
          }
        })
        .catch((err) => {
          console.log(err);
          this.articles = [];
        });
    },
  },
};
</script>