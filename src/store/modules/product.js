const state = () => ({
  productInfo: {},
});

const actions = {
  // εεΎεε
  async getProductInfo({ commit }, params) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      if (params !== "") {
        params.company = params.company === null ? "" : params.company;
        params.bigItem = params.bigItem === null ? "" : params.bigItem;
        params.kind = params.kind === null ? "" : params.kind;
        params.content = params.content === null ? "" : params.content;
        params.status = params.status === null ? "" : params.status;
      }

      const productInfo = await this._vm.$api.product.getProductInfo(params);
      productInfo.map((item) => {
        item.isLike = false;
        item.isCollect = false;
      });
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
