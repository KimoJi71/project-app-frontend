<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-row align="center" justify="center">
          <v-col class="mt-6 mb-3">
            <div class="text-center">
              <p class="text-h6">此功能為會員限定</p>
              <p class="text-h6">還不是會員嗎？趕快註冊加入吧！</p>
            </div>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn
            class="mb-6"
            color="grey"
            rounded
            outlined
            large
            @click="closeDialog()"
            >取消</v-btn
          >
          <v-btn
            class="mb-6 ml-6"
            color="primary lighten-1"
            depressed
            rounded
            large
            @click="goToLogin()"
            >加入</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog() {
      return this.visible;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
