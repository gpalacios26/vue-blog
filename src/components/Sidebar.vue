<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <router-link class="btn btn-success" :to="{name:'create'}">Crear artículo</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit.prevent="goSearch">
        <input type="text" name="search" v-model="searchString" />
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      searchString: null,
    };
  },
  methods: {
    goSearch() {
      if (this.searchString !== null) {
        this.$router.push("/redirect/" + this.searchString);
      }
    },
  },
};
</script>