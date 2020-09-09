<template>
  <div id="articles-list">
    <div v-if="articles && articles.length >= 1">
      <article class="article-item" v-for="article in articles" v-bind:key="article._id">
        <div class="image-wrap">
          <img :src="url + 'get-image/' + article.image" :alt="article.title" v-if="article.image" />
          <img src="../assets/images/default.jpg" :alt="article.title" v-if="!article.image" />
        </div>
        <h2>{{article.title}}</h2>
        <span class="date">{{article.date | moment("from","now")}}</span>
        <router-link :to="{name:'article', params:{id:article._id}}">Leer más</router-link>

        <div class="clearfix"></div>
      </article>
    </div>
    <div v-if="articles && articles.length < 1">
      <h2>No hay artículos que mostrar</h2>
    </div>
  </div>
</template>

<script>
import Global from "../Global";

export default {
  name: "Articles",
  props: ["articles"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>