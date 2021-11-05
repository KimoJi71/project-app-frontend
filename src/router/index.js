import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "HomePage",
    path: "/posts",
    component: () => import("@/pages/post/HomePage"),
  },
  {
    name: "PostDetail",
    path: "/posts/detail/:id",
    component: () => import("@/pages/post/PostDetail"),
  },
  {
    name: "CreatePost",
    path: "/posts/createPost",
    component: () => import("@/pages/post/CreatePost"),
  },
  {
    name: "UpdatePost",
    path: "/posts/updatePost",
    component: () => import("@/pages/post/UpdatePost"),
  },
  {
    name: "Products",
    path: "/products",
    component: () => import("@/pages/product/Product"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login"),
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register"),
  },
  {
    path: "/",
    redirect: "/posts",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
