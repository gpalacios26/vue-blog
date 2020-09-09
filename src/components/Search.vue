<template>
  <div id="search">
    <SliderComponent :texto="'Búsqueda: ' + searchString" home="false"></SliderComponent>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Listado de resultados</h2>
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
  name: "Search",
  components: {
    SliderComponent,
    SidebarComponent,
    Articles,
  },
  mounted() {
    this.searchString = this.$route.params.searchString;
    this.getArticlesBySearch(this.searchString);
  },
  data() {
    return {
      url: Global.url,
      articles: null,
      searchString: null,
    };
  },
  methods: {
    getArticlesBySearch(searchString) {
      axios
        .get(this.url + "search/" + searchString)
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