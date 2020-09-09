<template>
  <div id="slider" :class="{
    'slider-big': home == 'true',
    'slider-small': home != 'true'
  }">
    <h1>{{texto}}</h1>
    <router-link to="/blog" class="btn-white" v-if="home == 'true'">Ir al blog</router-link>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
  props: ['texto', 'home']
};
</script>