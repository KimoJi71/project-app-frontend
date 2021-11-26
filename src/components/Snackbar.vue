<template>
  <div>
    <!-- 提示跳窗，用 vuex 方式 傳遞  -->
    <v-snackbar v-model="popupStatus" :color="popupMsgColor" timeout="3000" top>
      <v-icon small color="white" class="mr-2">{{
        popupMsgColor === "green" ? "mdi-check-circle" : "mdi-close-circle"
      }}</v-icon>
      <span class="font-weight-bold">{{ popupMsg }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          x-small
          v-bind="attrs"
          @click="popupStatus = !popupStatus"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    popupStatus: {
      get() {
        return this.$store.state.popupStatus;
      },
      set(value) {
        this.$store.commit("setPopupStatus", value);
      },
    },
    ...mapState({
      popupMsg: (state) => state.popupMsg,
      popupMsgColor: (state) => state.popupMsgColor,
    }),
  },
};
</script>
