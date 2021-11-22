<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-row class="my-4" align="center" justify="center">
        <v-badge
          style="cursor: pointer"
          bottom
          bordered
          color="black"
          icon="mdi-camera"
          offset-x="20"
          offset-y="20"
        >
          <v-avatar class="mt-6" color="grey" size="85">
            <v-icon dark x-large>mdi-account</v-icon>
          </v-avatar>
        </v-badge>
      </v-row>
      <v-row class="mb-4" align="center" justify="center">
        <a class="blue--text">切換帳號</a>
      </v-row>
      <v-divider class="ml-4" />
      <v-card-text>
        <v-form>
          <v-row class="mt-1" no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field label="暱稱" dense filled rounded />
              <v-text-field label="身份" dense disabled filled rounded />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-textarea
                label="個人簡介"
                no-resize
                rows="4"
                dense
                filled
                rounded
              />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field label="帳號" dense filled rounded />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-text-field label="密碼" dense filled rounded />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-radio-group dense row>
                <span style="font-size: 14px">生理性別&emsp;&emsp;</span>
                <v-radio label="男性" value="0" />
                <v-radio label="女性" value="1" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
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
                  <v-btn text @click="$refs.menu.save(memBirth)">確定</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-select label="所屬公司" dense filled rounded :items="items" />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-text-field label="公司電話" dense filled rounded />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="2">
              <span style="font-size: 14px">可提供服務</span>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox label="壽險" value="1" />
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox label="產險" value="1" />
            </v-col>
            <v-col cols="12" md="7">
              <v-checkbox label="其他" value="1" />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field label="聯絡電話" dense filled rounded />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-text-field label="Line ID" dense filled rounded />
            </v-col>
          </v-row>
        </v-form>
        <v-row align="center" justify="center" class="my-4">
          <v-btn class="mr-10" color="grey" outlined @click="goBack()"
            >返回</v-btn
          >
          <v-btn color="blue darken-2" dark depressed>儲存</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "UpdateProfile",
  components: {
    Header,
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      menu: false,
      memBirth: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
