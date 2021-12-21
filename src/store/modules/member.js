const state = () => ({
  profile: {},
});

const actions = {
  // 取得個人資料
  async getProfile({ commit }, memNum) {
    try {
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "Loading...", { root: true });

      const profile = await this._vm.$api.member.getProfile(memNum);
      profile.data.isLike = false;
      profile.data.isCollect = false;
      commit("setProfile", profile);
      commit("setLoadingStatus", null, { root: true });
      commit("setLoadingMsg", "", { root: true });
      return profile;
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
