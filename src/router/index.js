import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
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
    name: "Profile",
    path: "/profile/:id",
    component: () => import("@/pages/profile/Profile"),
    meta: {
      title: "個人頁面",
    },
  },
  {
    name: "UpdateProfile",
    path: "/profile-edit/:id",
    component: () => import("@/pages/profile/UpdateProfile"),
    meta: {
      title: "編輯個人資料",
    },
  },
  {
    name: "CollectPost",
    path: "/collections/post/",
    component: () => import("@/pages/collection/collectPost"),
    meta: {
      title: "收藏",
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
