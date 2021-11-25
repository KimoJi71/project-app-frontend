import Vue from "vue";
import Vuex from "vuex";

import post from "./modules/post";
import product from "./modules/product";
import member from "./modules/member";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    loadingMsg: "",
    popupStatus: false,
    popupMsgColor: "",
    popupMsg: "",
  },
  mutations: {
    setLoadingStatus(state) {
      state.loadingStatus = !state.loadingStatus;
    },
    setLoadingMsg(state, loadingMsg) {
      state.loadingMsg = loadingMsg;
    },
    setPopupStatus(state, popupStatus) {
      state.popupStatus = popupStatus;
    },
    setPopupDetails(state, { popupMsgColor, popupMsg }) {
      state.popupMsgColor = popupMsgColor;
      state.popupMsg = popupMsg;
    },
  },
  modules: {
    post,
    product,
    member,
  },
});
