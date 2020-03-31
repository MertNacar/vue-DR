import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/category/book",
    name: "CategoryBook",
    component: CategoryBook
  },
  {
    path: "/category/book/literature",
    name: "CategoryBookLiterature",
    component: CategoryBookLiterature
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  },
  {
    path: "/book-detail",
    name: "BookDetail",
    component: BookDetail
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  }
];

const router = new VueRouter({
  routes
});

export default router;
