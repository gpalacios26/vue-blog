<template>
  <div id="article">
    <div class="center">
      <section id="content">
        <article class="article-item article-detail" v-if="article">
          <div class="image-wrap">
            <img
              :src="url + 'get-image/' + article.image"
              :alt="article.title"
              v-if="article.image"
            />
            <img src="../assets/images/default.jpg" :alt="article.title" v-if="!article.image" />
          </div>
          <h1 class="subheader">{{article.title}}</h1>
          <span class="date">{{article.date | moment("from","now")}}</span>
          <p>{{article.content}}</p>

          <router-link :to="{name:'edit', params:{id:article._id}}" class="btn btn-warning">Editar</router-link>
          <a @click="deleteArticle(article._id)" class="btn btn-danger">Eliminar</a>

          <div class="clearfix"></div>
        </article>
      </section>
      <SidebarComponent></SidebarComponent>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import Global from "../Global";
import SidebarComponent from "./Sidebar.vue";

export default {
  name: "Article",
  components: {
    SidebarComponent,
  },
  mounted() {
    var articleId = this.$route.params.id;
    this.getArticle(articleId);
  },
  data() {
    return {
      url: Global.url,
      article: null,
    };
  },
  methods: {
    getArticle(articleId) {
      axios
        .get(this.url + "article/" + articleId)
        .then((res) => {
          if (res.data.status == "success") {
            this.article = res.data.article;
          } else {
            this.article = [];
          }
        })
        .catch((err) => {
          console.log(err);
          this.article = [];
        });
    },
    deleteArticle(articleId) {
      swal({
        title: "Alerta",
        text: "Deseas eliminar el registro seleccionado?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(this.url + "article/" + articleId).then((res) => {
            if (res.data.article) {
              this.article = res.data.article;
            }

            // Mostrar mensaje
            swal({
              title: "Artículo eliminado",
              text: "El artículo se ha eliminado correctamente",
              icon: "success",
            });

            this.$router.push("/blog");
          });
        }
      });
    },
  },
};
</script>