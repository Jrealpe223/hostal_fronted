import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import RoomsComponent from '../components/RoomsComponent.vue';
import HomePage from '../components/HomePage.vue';
import Forms from '../components/Forms.vue';


const routes = [
{path: '/', redirect:'/home', component: HomePage},

  { path: '/home', component: HomePage },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/rooms', component: RoomsComponent },
  { path: '/Forms', component: Forms },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
