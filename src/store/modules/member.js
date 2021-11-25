const state = () => ({
  profile: {},
});

const actions = {
  async getProfile({ commit }, memNum) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      const profile = await this._vm.$api.member.getProfile(memNum);
      commit("setProfile", profile);
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
