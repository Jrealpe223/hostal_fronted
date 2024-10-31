//import Vue from 'vue';
//import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Rooms from '../components/Rooms.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/rooms', component: Rooms }
];

const router = new VueRouter({
  routes
});

export default router;