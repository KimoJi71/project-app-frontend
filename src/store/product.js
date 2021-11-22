const state = () => ({
  productInfo: {},
});

const actions = {
  async getProductInfo({ commit }) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      const productInfo = await this._vm.$api.product.getProductInfo();
      commit("setProductInfo", productInfo);
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      return productInfo;
    } catch (err) {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      console.log(err);
    }
  },
};

const mutations = {
  setProductInfo(state, productInfo) {
    state.productInfo = productInfo;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
