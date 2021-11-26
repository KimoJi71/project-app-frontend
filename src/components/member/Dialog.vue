<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <v-card>
        <v-row>
          <v-col class="d-flex">
            <v-card-title class="ml-4 text-h6 font-weight-bold">
              變更密碼
            </v-card-title>
            <v-spacer />
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-4 mr-8"
                  color="red"
                  fab
                  outlined
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="closeDialog"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>關閉</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-divider />
        <v-row no-gutters class="mt-6" align="center" justify="center">
          <v-col cols="12" md="10">
            <v-form v-model="valid">
              <v-text-field
                label="原密碼"
                :append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showOld ? 'text' : 'password'"
                filled
                rounded
                :rules="[(v) => !!v || '必填']"
                @click:append="showOld = !showOld"
                v-model="memOldPassword"
              />
              <v-text-field
                label="新密碼"
                :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNew ? 'text' : 'password'"
                filled
                rounded
                :rules="[(v) => !!v || '必填']"
                @click:append="showNew = !showNew"
                v-model="memNewPassword"
              />
              <v-text-field
                label="確認密碼"
                :append-icon="showCheck ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showCheck ? 'text' : 'password'"
                filled
                rounded
                :rules="[(v) => !!v || '必填']"
                @click:append="showCheck = !showCheck"
                v-model="memCheckPassword"
              />
            </v-form>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn
            class="mb-6"
            color="primary lighten-1"
            depressed
            :disabled="!valid"
            @click="updatePassword()"
            >送出</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <Snackbar />
  </v-row>
</template>
<script>
import Snackbar from "@/components/Snackbar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    memNum: {
      type: Number,
      default: null,
    },
  },
  components: {
    Snackbar,
  },
  data() {
    return {
      showOld: false,
      showNew: false,
      showCheck: false,
      valid: false,
      memOldPassword: "",
      memNewPassword: "",
      memCheckPassword: "",
    };
  },
  computed: {
    dialog() {
      return this.visible;
    },
    ...mapState({
      popupStatus: (state) => state.popupStatus,
    }),
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    async updatePassword() {
      try {
        if (this.memNewPassword === this.memCheckPassword) {
          await this.$api.member.updatePassword(this.memNum, {
            memOldPassword: this.memOldPassword,
            memNewPassword: this.memNewPassword,
          });
          this.$emit("closeDialog");
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "密碼變更成功" },
            { root: true }
          );
        } else {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "red", popupMsg: "密碼錯誤" },
            { root: true }
          );
        }
      } catch (err) {
        this.setPopupStatus(true, { root: true });
        this.setPopupDetails(
          { popupMsgColor: "red", popupMsg: "密碼錯誤" },
          { root: true }
        );
      }
    },
    ...mapMutations({
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
};
</script>
