<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-row class="my-4" align="center" justify="center">
        <div @click="onSelect = !onSelect">
          <v-badge
            style="cursor: pointer"
            bottom
            bordered
            icon="mdi-camera"
            color="black"
            offset-x="20"
            offset-y="20"
          >
            <v-avatar class="mt-6" color="grey" size="85">
              <v-icon v-if="memPhoto === null" dark x-large>mdi-account</v-icon>
              <v-img v-else cover :src="memPhoto" />
            </v-avatar>
          </v-badge>
        </div>
      </v-row>
      <v-row v-if="onSelect" class="mb-4" align="center" justify="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              fab
              outlined
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-file-input
                class="ml-2 mb-1 primary--text"
                accept="image/*"
                hide-input
                prepend-icon="mdi-paperclip"
                dense
                @change="imgSelected($event)"
              />
            </v-btn>
          </template>
          <span>選擇圖片</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-5"
              color="blue-grey"
              dark
              fab
              outlined
              small
              v-bind="attrs"
              v-on="on"
              @click="uploadImg()"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </template>
          <span>上傳</span>
        </v-tooltip>
      </v-row>
      <v-row no-gutters class="mb-4" align="center" justify="center">
        <v-btn color="blue" text @click="updatePassword">變更密碼</v-btn>
      </v-row>
      <v-divider class="ml-4" />
      <v-card-text>
        <v-form>
          <v-row class="mt-1" no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field
                label="暱稱"
                dense
                filled
                rounded
                v-model="profileInfo.memName"
              />
              <v-radio-group
                class="pa-0"
                dense
                row
                disabled
                v-model="profileInfo.memIdentify"
              >
                <span style="font-size: 14px"
                  >身份&emsp;&emsp;&emsp;&emsp;</span
                >
                <v-radio label="保戶" :value="0" />
                <v-radio label="業務員" :value="1" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-textarea
                label="個人簡介"
                no-resize
                rows="4"
                dense
                filled
                rounded
                v-model="profileInfo.memIntro"
              />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5">
              <v-radio-group
                class="ma-0"
                dense
                row
                v-model="profileInfo.memGender"
              >
                <span style="font-size: 14px">生理性別&emsp;&emsp;</span>
                <v-radio label="男性" :value="0" />
                <v-radio label="女性" :value="1" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="profileInfo.memBirth"
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
                    v-model="profileInfo.memBirth"
                  />
                </template>
                <v-date-picker
                  v-model="profileInfo.memBirth"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn text @click="menu = false">取消</v-btn>
                  <v-btn text @click="$refs.menu.save(profileInfo.memBirth)"
                    >確定</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            align="center"
            justify="center"
            v-if="profileInfo.memIdentify === 1"
          >
            <v-col cols="12" md="5">
              <v-autocomplete
                label="所屬公司"
                dense
                filled
                rounded
                :items="company"
                v-model="profileInfo.memCompany"
              />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-text-field
                label="公司電話"
                dense
                filled
                rounded
                v-model="profileInfo.companyContact"
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            align="center"
            justify="center"
            v-if="profileInfo.memIdentify === 1"
          >
            <v-col cols="12" md="2">
              <span style="font-size: 14px">可提供服務</span>
            </v-col>
            <v-col class="d-flex" cols="12" md="9">
              <v-checkbox
                label="壽險"
                value="壽險"
                v-model="profileInfo.memService"
              />
              <v-checkbox
                label="產險"
                class="ml-2"
                value="產險"
                v-model="profileInfo.memService"
              />
              <v-checkbox
                label="其他"
                class="ml-2"
                value="其他"
                v-model="profileInfo.memService"
              />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            align="center"
            justify="center"
            v-if="profileInfo.memIdentify === 1"
          >
            <v-col cols="12" md="5">
              <v-text-field
                label="聯絡電話"
                dense
                filled
                rounded
                v-model="profileInfo.memPhone"
              />
            </v-col>
            <v-col cols="12" md="5" offset-md="1">
              <v-text-field
                label="Line ID"
                dense
                filled
                rounded
                v-model="profileInfo.memLineID"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row align="center" justify="center" class="my-4">
          <v-btn class="mr-10" color="grey" outlined @click="goBack()"
            >返回</v-btn
          >
          <v-btn color="blue darken-2" dark depressed @click="updateProfile()"
            >儲存</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>

    <DialogEditPasswd
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :memNum="memNum"
      @closeDialog="onCancel"
    />
    <Snackbar />
    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import DialogEditPasswd from "@/components/member/DialogEditPasswd.vue";
import company from "@/assets/constant/company.js";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "UpdateProfile",
  components: {
    Header,
    Snackbar,
    Loading,
    DialogEditPasswd,
  },
  data() {
    return {
      // 上傳頭貼
      onSelect: false,
      memPhoto: null,
      uploadMemPhoto: null,

      dialogVisible: false,
      memNum: parseInt(this.$route.params.memNum),
      menu: false,
      company,
      profileInfo: {},
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      profile: (state) => state.member.profile,
    }),
  },
  methods: {
    // 上傳頭貼
    imgSelected(evt) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.memPhoto = reader.result; // base64 code
        this.uploadMemPhoto = evt;
      });
      reader.readAsDataURL(evt);
    },
    async uploadImg() {
      try {
        const payload = {
          memNum: this.memNum,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const imgData = new FormData();
        imgData.append("memPhoto", this.uploadMemPhoto);
        const res = await this.$api.image.uploadMemPhoto(payload, imgData);
        if (res.message === "照片上傳成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "照片上傳成功" },
            { root: true }
          );
          this.onSelect = false;
          this.getMemProfile();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 變更密碼點選後，開啟 dialog
    updatePassword() {
      this.dialogVisible = true;
    },
    onCancel() {
      this.dialogVisible = false;
    },
    async updateProfile() {
      try {
        const res = await this.$api.member.updateProfile(this.memNum, {
          memName: this.profileInfo.memName,
          memIntro: this.profileInfo.memIntro,
          memGender: this.profileInfo.memGender,
          memBirth: this.profileInfo.memBirth ? this.profileInfo.memBirth : "",
          memCompany: this.profileInfo.memCompany,
          companyContact: this.profileInfo.companyContact
            ? this.profileInfo.companyContact
            : null,
          memService: this.profileInfo.memService
            ? this.profileInfo.memService.map((item) => item).join(",")
            : null,
          memPhone: this.profileInfo.memPhone
            ? this.profileInfo.memPhone
            : null,
          memLineID: this.profileInfo.memLineID
            ? this.profileInfo.memLineID
            : null,
        });
        if (res.message === "個人資料編輯成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "個人資料編輯成功" },
            { root: true }
          );
          this.$router.back(-1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    async getMemProfile() {
      if (this.memNum) {
        try {
          await this.getProfile(this.memNum);
          this.profileInfo = this.profile.data;
          this.profileInfo.memBirth = this.profileInfo.memBirth
            ? this.$moment(this.profileInfo.memBirth).format("YYYY-MM-DD")
            : "";
          if (this.profileInfo.memPhoto !== null) {
            this.memPhoto =
              "http://localhost:3000/images\\" + this.profileInfo.memPhoto;
          }
          if (this.profileInfo.memIdentify === 1) {
            this.profileInfo.memService =
              this.profileInfo.memService.split(",");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    ...mapActions({
      getProfile: "member/getProfile",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  async mounted() {
    this.getMemProfile();
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
