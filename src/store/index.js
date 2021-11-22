import Vue from "vue";
import Vuex from "vuex";

import product from "./product";

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
    product,
  },
});
