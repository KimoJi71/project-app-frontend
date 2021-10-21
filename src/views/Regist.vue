<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-8 my-8">
              <v-row>
                <v-col class="orange lighten-1" cols="12" md="5">
                  <v-card-text>
                    <v-img src="../../public/專題LOGO-v.png" class="mt-10" />
                  </v-card-text>
                  <div class="text-center mt-4">
                    <v-btn rounded outlined dark x-large @click="goLogin()"
                      >登入</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="7">
                  <v-card-text class="mt-8">
                    <v-form>
                      <v-text-field
                        label="帳號"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-text-field
                        label="密碼"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        color="orange"
                        dense
                        filled
                        rounded
                        @click:append="show = !show"
                      />
                      <v-radio-group dense row>
                        <span style="font-size: 14px"
                          >生理性別&emsp;&emsp;</span
                        >
                        <v-radio label="男性" value="male" />
                        <v-radio label="女性" value="female" />
                      </v-radio-group>
                      <v-text-field
                        label="暱稱"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-text-field
                        label="出生日期"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-radio-group dense row>
                        <span style="font-size: 14px">身份&emsp;&emsp;</span>
                        <v-radio label="保戶" value="member" />
                        <v-radio label="業務員" value="salesmanMember" />
                      </v-radio-group>
                      <v-select
                        label="所屬公司"
                        :items="items"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-text-field
                        label="公司電話"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-text-field
                        label="公司 Email"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <span style="font-size: 14px">可提供服務</span>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-checkbox label="壽險" />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label="產險" />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label="其他" />
                        </v-col>
                      </v-row>
                      <v-text-field
                        label="連絡電話"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                      <v-text-field
                        label="Line ID"
                        color="orange"
                        dense
                        filled
                        rounded
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3 mb-6">
                    <v-btn color="orange lighten-1" dark rounded x-large
                      >註冊</v-btn
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
      items: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
