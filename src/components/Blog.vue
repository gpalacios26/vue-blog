<template>
  <div id="blog">
    <SliderComponent texto="Blog" home="false"></SliderComponent>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Listado de artículos</h2>
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
  name: "Blog",
  components: {
    SliderComponent,
    SidebarComponent,
    Articles,
  },
  mounted() {
    this.getArticles();
  },
  data() {
    return {
      url: Global.url,
      articles: null,
    };
  },
  methods: {
    getArticles() {
      axios
        .get(this.url + "articles")
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