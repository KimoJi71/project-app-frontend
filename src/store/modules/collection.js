const state = () => ({
  posts: [],
  products: [],
  salesmanData: [],
});

const actions = {
  // 取得文章
  async getCollectPost({ commit }, memNum) {
    try {
      const posts = await this._vm.$api.collection.getCollectPost(memNum);
      posts.map((item) => {
        item.isLike = false;
      });
      commit("setPosts", posts);
      return posts;
    } catch (err) {
      console.log(err);
    }
  },
  // 取得商品
  async getCollectProduct({ commit }, memNum) {
    try {
      const products = await this._vm.$api.collection.getCollectProduct(memNum);
      products.map((item) => {
        item.isLike = false;
      });
      commit("setProducts", products);
      return products;
    } catch (err) {
      console.log(err);
    }
  },
  // 取得業務員
  async getCollectSalesman({ commit }, memNum) {
    try {
      const salesmanData = await this._vm.$api.collection.getCollectSalesman(
        memNum
      );
      salesmanData.map((item) => {
        item.isLike = false;
      });
      commit("setSalesmanData", salesmanData);
      return salesmanData;
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
  setSalesmanData(state, salesmanData) {
    state.salesmanData = salesmanData;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
