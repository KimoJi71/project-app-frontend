<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-8 my-8">
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
                    <v-form>
                      <v-text-field
                        label="帳號"
                        dense
                        filled
                        rounded
                        v-model="account"
                      />
                      <v-text-field
                        label="密碼"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        dense
                        filled
                        rounded
                        @click:append="show = !show"
                        v-model="passwd"
                      />
                      <v-radio-group dense row v-model="gender">
                        <span style="font-size: 14px"
                          >生理性別&emsp;&emsp;</span
                        >
                        <v-radio label="男性" value="male" />
                        <v-radio label="女性" value="female" />
                      </v-radio-group>
                      <v-text-field label="暱稱" dense filled rounded />
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            label="出生日期"
                            dense
                            filled
                            rounded
                            clearable
                            v-bind="attrs"
                            v-on="on"
                            v-model="date"
                          />
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <v-spacer />
                          <v-btn text @click="menu = false">取消</v-btn>
                          <v-btn text @click="$refs.menu.save(date)"
                            >確定</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                      <v-radio-group dense row v-model="identify">
                        <span style="font-size: 14px">身份&emsp;&emsp;</span>
                        <v-radio label="保戶" value="member" />
                        <v-radio label="業務員" value="salesmanMember" />
                      </v-radio-group>
                      <div v-if="identify === 'salesmanMember'">
                        <v-select
                          label="所屬公司"
                          :items="items"
                          dense
                          filled
                          rounded
                          v-model="company"
                        />
                        <v-text-field
                          label="公司電話"
                          dense
                          filled
                          rounded
                          v-model="companyPhone"
                        />
                        <v-text-field
                          label="公司 Email"
                          dense
                          filled
                          rounded
                          v-model="companyEmail"
                        />
                        <span style="font-size: 14px">可提供服務</span>
                        <v-row>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="壽險"
                              value="lifeIns"
                              v-model="service"
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="產險"
                              value="propertyIns"
                              v-model="service"
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              label="其他"
                              value="else"
                              v-model="service"
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="連絡電話"
                          dense
                          filled
                          rounded
                          v-model="phone"
                        />
                        <v-text-field
                          label="Line ID"
                          dense
                          filled
                          rounded
                          v-model="lineID"
                        />
                      </div>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3 mb-6">
                    <v-btn color="primary lighten-1" dark rounded x-large
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
      account: "",
      passwd: "",
      gender: "",
      menu: false,
      date: "",
      identify: "",
      // 若身份為業務員
      company: "",
      companyPhone: "",
      companyEmail: "",
      service: [],
      phone: "",
      lineID: "",
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
