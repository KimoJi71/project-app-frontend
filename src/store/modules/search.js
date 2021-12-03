const state = () => ({
  posts: [],
  products: [],
  members: [],
});

const actions = {
  // 取得文章
  async getSearchPost({ commit }, keywords) {
    try {
      const posts = await this._vm.$api.search.search(keywords, "posts");
      posts.map((item) => {
        item.isLike = false;
        item.isCollect = false;
      });
      commit("setPosts", posts);
      return posts;
    } catch (err) {
      console.log(err);
    }
  },
  // 取得商品
  async getSearchProduct({ commit }, keywords) {
    try {
      const products = await this._vm.$api.search.search(keywords, "products");
      products.map((item) => {
        item.isLike = false;
        item.isCollect = false;
      });
      commit("setProducts", products);
      return products;
    } catch (err) {
      console.log(err);
    }
  },
  // 取得用戶
  async getSearchMember({ commit }, keywords) {
    try {
      const members = await this._vm.$api.search.search(keywords, "members");
      members.map((item) => {
        item.isLike = false;
        item.isCollect = false;
      });
      commit("setMembers", members);
      return members;
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setmembers(state, members) {
    state.members = members;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
