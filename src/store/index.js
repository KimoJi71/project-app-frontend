import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    popupStatus: false,
    popupMsgColor: "",
    popupMsg: "",
  },
  mutations: {
    setPopupStatus(state, popupStatus) {
      state.popupStatus = popupStatus;
    },
    setPopupDetails(state, { popupMsgColor, popupMsg }) {
      state.popupMsgColor = popupMsgColor;
      state.popupMsg = popupMsg;
    },
  },
});
