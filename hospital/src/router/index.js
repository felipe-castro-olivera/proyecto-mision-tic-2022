import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegistrarPaciente from "../components/RegistrarPaciente";
import RegistrarFamiliarPaciente from "../components/RegistrarFamiliarPaciente";
import RegistrarDoctor from "../components/RegistrarDoctor";
import Pacientes from "../components/ListarPacientes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/",
    name: "pacientes",
    component: Pacientes,
  },
  {
    path: "/registrar-paciente",
    name: "registrar-paciente",
    component: RegistrarPaciente,
  },
  {
    path: "/registrar-doctor",
    name: "registrar-doctor",
    component: RegistrarDoctor,
  },
  {
    path: "/registrar-familiar-paciente",
    name: "registrar-familiar-paciente",
    component: RegistrarFamiliarPaciente,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
