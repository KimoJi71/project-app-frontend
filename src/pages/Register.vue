<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="my-8" elevation="8">
              <v-row>
                <v-col class="primary lighten-1" cols="12" md="5">
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
                    <v-form v-model="valid">
                      <v-text-field
                        class="importantIcon"
                        label="帳號"
                        prepend-icon="*"
                        dense
                        filled
                        rounded
                        v-model="memAccount"
                        :rules="[(v) => !!v || '必填']"
                      />
                      <v-text-field
                        class="importantIcon"
                        label="密碼"
                        prepend-icon="*"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        dense
                        filled
                        rounded
                        @click:append="show = !show"
                        v-model="memPassword"
                        :rules="[(v) => !!v || '必填']"
                      />
                      <v-text-field
                        class="importantIcon"
                        label="暱稱"
                        prepend-icon="*"
                        dense
                        filled
                        rounded
                        v-model="memName"
                        :rules="[(v) => !!v || '必填']"
                      />
                      <v-radio-group dense row v-model="memGender">
                        <span style="font-size: 14px"
                          >生理性別&emsp;&emsp;</span
                        >
                        <v-radio label="男性" value="0" />
                        <v-radio label="女性" value="1" />
                      </v-radio-group>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="memBirth"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            label="出生日期"
                            append-icon="mdi-calendar"
                            dense
                            filled
                            rounded
                            clearable
                            v-bind="attrs"
                            v-on="on"
                            v-model="memBirth"
                          />
                        </template>
                        <v-date-picker v-model="memBirth" no-title scrollable>
                          <v-spacer />
                          <v-btn text @click="menu = false">取消</v-btn>
                          <v-btn text @click="$refs.menu.save(memBirth)"
                            >確定</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                      <v-radio-group
                        class="importantIcon"
                        prepend-icon="*"
                        dense
                        row
                        v-model="memIdentify"
                        :rules="[(v) => !!v || '必填']"
                      >
                        <span style="font-size: 14px">身份&emsp;&emsp;</span>
                        <v-radio label="保戶" value="0" />
                        <v-radio label="業務員" value="1" />
                      </v-radio-group>
                      <div v-if="memIdentify === '1'">
                        <v-select
                          label="所屬公司"
                          :items="items"
                          dense
                          filled
                          rounded
                          v-model="memCompany"
                        />
                        <v-text-field
                          label="公司電話"
                          dense
                          filled
                          rounded
                          v-model="companyContact"
                        />
                        <span style="font-size: 14px">可提供服務</span>
                        <v-row>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="壽險"
                              value="1"
                              v-model="memService"
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="產險"
                              value="2"
                              v-model="memService"
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="其他"
                              value="3"
                              v-model="memService"
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="連絡電話"
                          dense
                          filled
                          rounded
                          v-model="memPhone"
                        />
                        <v-text-field
                          label="Line ID"
                          dense
                          filled
                          rounded
                          v-model="memLineID"
                        />
                      </div>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3 mb-6">
                    <v-btn
                      color="primary lighten-1"
                      rounded
                      x-large
                      :disabled="!valid"
                      @click="register()"
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

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Register",
  props: {
    source: String,
  },
  components: { Snackbar },
  data() {
    return {
      valid: false,
      show: false,
      items: [1, 2, 3, 4, 5],

      memAccount: "",
      memPassword: "",
      memName: "",
      memGender: null,
      menu: false,
      memBirth: null,
      memIdentify: "",
      // 若身份為業務員(memIdentify=1)
      memCompany: "",
      companyContact: "",
      memService: [],
      memPhone: "",
      memLineID: "",
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
    }),
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    async register() {
      try {
        if (this.memIdentify === "0") {
          const res = await this.$api.auth.register({
            memAccount: this.memAccount,
            memPassword: this.memPassword,
            memIdentify: this.memIdentify,
            memName: this.memName,
            memGender: this.memGender,
            memBirth: this.memBirth,
          });
          console.log(res);
        } else {
          await this.$api.auth.register({
            memAccount: this.memAccount,
            memPassword: this.memPassword,
            memIdentify: this.memIdentify,
            memName: this.memName,
            memGender: this.memGender,
            memBirth: this.memBirth,
            memCompany: this.memCompany,
            companyContact: this.companyContact,
            memService: this.memService.join(","),
            memPhone: this.memPhone,
            memLineID: this.memLineID,
          });
        }
        this.setPopupStatus(true, { root: true });
        this.setPopupDetails(
          { popupMsgColor: "green", popupMsg: "註冊成功" },
          { root: true }
        );
        this.$router.push({ name: "Login" });
      } catch (err) {
        if (err.response.data.status === "帳號已被註冊") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "red", popupMsg: "帳號已被註冊" },
            { root: true }
          );
        } else {
          console.log(err);
        }
      }
    },
    ...mapMutations({
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
};
</script>

<style>
.importantIcon .v-input__icon--prepend .v-icon {
  color: red;
}
</style>
