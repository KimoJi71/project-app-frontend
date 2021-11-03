<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-8">
              <v-row>
                <v-col cols="12" md="5" class="primary lighten-1">
                  <v-card-text>
                    <v-img src="../../public/專題LOGO-v.png" class="mt-10" />
                  </v-card-text>
                  <div class="text-center mt-4">
                    <v-btn rounded outlined dark x-large @click="goRegist()"
                      >註冊</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="7">
                  <v-card-text class="mt-12">
                    <h1 class="text-center grey--text">感謝您使用我們的網站</h1>
                    <br /><br />
                    <h1 class="text-center grey--text">登入使用更多功能</h1>
                    <br />
                    <v-form class="mt-6">
                      <v-text-field
                        label="帳號"
                        prepend-inner-icon="mdi-account"
                        filled
                        rounded
                        v-model="account"
                      />
                      <v-text-field
                        label="密碼"
                        prepend-inner-icon="mdi-lock"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        filled
                        rounded
                        @click:append="show = !show"
                        v-model="passwd"
                      />
                    </v-form>
                    <v-btn color="primary lighten-1" text>忘記密碼？</v-btn>
                  </v-card-text>
                  <div class="text-center mt-3 mb-6">
                    <v-btn
                      color="primary lighten-1"
                      dark
                      rounded
                      x-large
                      @click="login()"
                      >登入</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      show: false,
      account: "",
      passwd: "",
    };
  },
  methods: {
    goRegist() {
      this.$router.push({ name: "Register" });
    },
    login() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
