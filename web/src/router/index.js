import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryBook from "../views/CategoryBook";
import CategoryBookLiterature from "../views/CategoryBookLiterature";
import Login from "../views/Login";
import BookDetail from "../views/BookDetail";
import Cart from "../views/Cart";
import Register from "../views/Register";
import Payment from "../views/Payment";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
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
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment
  }
];

const router = new VueRouter({
  routes
});

export default router;
