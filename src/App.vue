<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import FooterComponent from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  },
};
</script>

<style>
@import "./assets/css/styles.css";
</style>