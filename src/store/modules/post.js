const state = () => ({
  posts: {},
});

const actions = {
  // 取得商品
  async getPosts({ commit }) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      const posts = await this._vm.$api.post.getPosts();
      commit("setPosts", posts);
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      return posts;
    } catch (err) {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      console.log(err);
    }
  },
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
