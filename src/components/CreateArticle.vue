<template>
  <div id="create-article">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Crear Artículo</h2>
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
  name: "CreateArticle",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      url: Global.url,
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
          .post(this.url + "save", this.article)
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
                      title: "Artículo creado",
                      text: "El artículo se ha creado correctamente",
                      icon: "success",
                    });

                    this.$router.push("/blog");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                // Mostrar mensaje
                swal({
                  title: "Artículo creado",
                  text: "El artículo se ha creado correctamente",
                  icon: "success",
                });

                this.$router.push("/blog");
              }
            }
          })
          .catch((err) => {
            console.log(err);

            // Mostrar mensaje
            swal({
              title: "Artículo no se ha creado",
              text: "El artículo no se ha creado correctamente",
              icon: "error",
            });
          });
      }
    },
  },
};
</script>