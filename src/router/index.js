import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "HomePage",
    path: "/posts",
    component: () => import("@/pages/post/HomePage"),
    meta: {
      title: "首頁",
    },
  },
  {
    name: "PostDetail",
    path: "/posts/detail/:id",
    component: () => import("@/pages/post/PostDetail"),
    meta: {
      title: "首頁",
    },
  },
  {
    name: "CreatePost",
    path: "/posts/createPost",
    component: () => import("@/pages/post/CreatePost"),
    meta: {
      title: "新增文章",
    },
  },
  {
    name: "UpdatePost",
    path: "/posts/updatePost",
    component: () => import("@/pages/post/UpdatePost"),
    meta: {
      title: "編輯文章",
    },
  },
  {
    name: "Products",
    path: "/products",
    component: () => import("@/pages/product/Product"),
    meta: {
      title: "保險商品",
    },
  },
  {
    name: "ProductDetail",
    path: "/products/detail/:id",
    component: () => import("@/pages/product/ProductDetail"),
    meta: {
      title: "保險商品",
    },
  },
  {
    name: "Login",
    path: "/",
    component: () => import("@/pages/Login"),
    meta: {
      title: "登入",
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: {
      title: "註冊",
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
