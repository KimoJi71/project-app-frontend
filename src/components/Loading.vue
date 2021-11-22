<template>
  <div class="text-center">
    <!-- 全局 loading 特效  -->
    <v-overlay :value="loadingStatus" opacity="0.7" z-index="203">
      <p class="white--text text-h5 text-center pb-5">{{ loadingMsg }}</p>
      <v-progress-circular
        indeterminate
        color="primary"
        size="90"
        class="mr-3"
      />
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      loadingStatus: (state) => state.loadingStatus,
      loadingMsg: (state) => state.loadingMsg,
    }),
  },
};
</script>
