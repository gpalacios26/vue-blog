<template>
  <div id="edit-article">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Editar Artículo</h2>
        <form class="mid-form" @submit.prevent="saveArticle()">
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" name="title" v-model="article.title" />
            <div v-if="submitted && !$v.article.title.required">Este campo es requerido</div>
          </div>
          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea name="content" v-model="article.content"></textarea>
            <div v-if="submitted && !$v.article.content.required">Este campo es requerido</div>
          </div>
          <div class="form-group">
            <label for="image">Imagen</label>
            <div class="image-thumb">
              <img
                :src="url + 'get-image/' + article.image"
                :alt="article.title"
                v-if="article.image"
              />
              <img src="../assets/images/default.jpg" :alt="article.title" v-if="!article.image" />
            </div>
            <input type="file" id="file" ref="file" name="file0" @change="fileChange()" />
          </div>

          <div class="clearfix"></div>
          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
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
import { required } from "vuelidate/lib/validators";
import SidebarComponent from "./Sidebar.vue";
import Article from "../models/Article";

export default {
  name: "EditArticle",
  components: {
    SidebarComponent,
  },
  mounted() {
    this.articleId = this.$route.params.id;
    this.getArticle(this.articleId);
  },
  data() {
    return {
      url: Global.url,
      articleId: null,
      file: "",
      submitted: false,
      article: new Article("", "", null, ""),
    };
  },
  validations: {
    article: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
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
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
    saveArticle() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "article/" + this.articleId, this.article)
          .then((res) => {
            if (res.data.status == "success") {
              var articleId = res.data.article._id;
              if (
                this.file !== null &&
                this.file !== undefined &&
                this.file !== ""
              ) {
                // Subida de archivo
                const formData = new FormData();
                formData.append("file0", this.file, this.file.name);
                axios
                  .post(this.url + "upload-image/" + articleId, formData)
                  .then((res) => {
                    if (res.data.article) {
                      this.article = res.data.article;
                    }

                    // Mostrar mensaje
                    swal({
                      title: "Artículo editado",
                      text: "El artículo se ha editado correctamente",
                      icon: "success",
                    });

                    this.$router.push("/blog/articulo/" + this.articleId);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                // Mostrar mensaje
                swal({
                  title: "Artículo editado",
                  text: "El artículo se ha editado correctamente",
                  icon: "success",
                });

                this.$router.push("/blog/articulo/" + this.articleId);
              }
            }
          })
          .catch((err) => {
            console.log(err);

            // Mostrar mensaje
            swal({
              title: "Artículo no se ha editado",
              text: "El artículo no se ha editado correctamente",
              icon: "error",
            });
          });
      }
    },
  },
};
</script>