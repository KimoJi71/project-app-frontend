const state = () => ({
  comments: [],
});

const actions = {
  // 取得留言
  async getComments({ commit }, postNum) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      const comments = await this._vm.$api.comment.getComments(postNum);
      comments.map((item) => {
        item.isLike = false;
      });
      commit("setComments", comments);
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      return comments;
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
