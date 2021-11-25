import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: {
      title: "登入",
      keepAlive: false,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: {
      title: "註冊",
      keepAlive: false,
    },
  },
  {
    name: "HomePage",
    path: "/posts",
    component: () => import("@/pages/post/HomePage"),
    meta: {
      title: "文章",
      keepAlive: false,
    },
  },
  {
    name: "PostDetail",
    path: "/posts/detail/:postNum",
    component: () => import("@/pages/post/PostDetail"),
    meta: {
      title: "文章",
      keepAlive: false,
    },
  },
  {
    name: "CreatePost",
    path: "/posts/createPost",
    component: () => import("@/pages/post/CreatePost"),
    meta: {
      title: "新增文章",
      keepAlive: false,
    },
  },
  {
    name: "UpdatePost",
    path: "/posts/updatePost/:postNum",
    component: () => import("@/pages/post/UpdatePost"),
    meta: {
      title: "編輯文章",
      keepAlive: false,
    },
  },
  {
    name: "Products",
    path: "/products",
    component: () => import("@/pages/product/Product"),
    meta: {
      title: "保險商品",
      keepAlive: true,
    },
  },
  {
    name: "ProductDetail",
    path: "/products/detail/:proNum",
    component: () => import("@/pages/product/ProductDetail"),
    meta: {
      title: "保險商品",
      keepAlive: false,
    },
  },
  {
    name: "Profile",
    path: "/profile/:memNum",
    component: () => import("@/pages/profile/Profile"),
    meta: {
      title: "個人頁面",
      keepAlive: false,
    },
  },
  {
    name: "UpdateProfile",
    path: "/profile-edit/:memNum",
    component: () => import("@/pages/profile/UpdateProfile"),
    meta: {
      title: "編輯個人資料",
      keepAlive: false,
    },
  },
  {
    name: "CollectPost",
    path: "/collections/post",
    component: () => import("@/pages/collection/CollectPost"),
    meta: {
      title: "收藏",
      keepAlive: true,
    },
  },
  {
    name: "CollectProduct",
    path: "/collections/product",
    component: () => import("@/pages/collection/CollectProduct"),
    meta: {
      title: "收藏",
      keepAlive: true,
    },
  },
  {
    name: "CollectSalesman",
    path: "/collections/salesman",
    component: () => import("@/pages/collection/CollectSalesman"),
    meta: {
      title: "收藏",
      keepAlive: true,
    },
  },
  {
    path: "*",
    redirect: { name: "Products" },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
