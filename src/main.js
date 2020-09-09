import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/es';

// Importar componentes
import Home from './components/Home.vue';
import Blog from './components/Blog.vue';
import Article from './components/Article.vue';
import CreateArticle from './components/CreateArticle.vue';
import EditArticle from './components/EditArticle.vue';
import Formulario from './components/Formulario.vue';
import Peliculas from './components/Peliculas.vue';
import Pagina from './components/Pagina.vue';
import Search from './components/Search.vue';
import Redirect from './components/Redirect.vue';
import ErrorComponent from './components/Error.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueMoment, { moment });

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/articulo/:id', name: 'article', component: Article },
  { path: '/blog/crear-articulo', name: 'create', component: CreateArticle },
  { path: '/blog/editar-articulo/:id', name: 'edit', component: EditArticle },
  { path: '/formulario', component: Formulario },
  { path: '/peliculas', component: Peliculas },
  { path: '/pagina/:id?', name: 'pagina', component: Pagina },
  { path: '/buscador/:searchString', component: Search },
  { path: '/redirect/:searchString', component: Redirect },
  { path: '*', component: ErrorComponent }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
