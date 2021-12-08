<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <v-card>
        <v-row>
          <v-col class="d-flex">
            <v-card-title class="ml-4 text-h6 font-weight-bold">
              {{ title }}
            </v-card-title>
            <v-spacer />
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-4 mr-6"
                  color="red"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="closeDialog"
                >
                  <v-icon large>mdi-close-circle-outline</v-icon>
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
              <v-textarea
                label="檢舉原因"
                filled
                no-resize
                :rules="[(v) => !!v || '必填']"
                v-model="content"
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
            @click="report"
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
    title: {
      type: String,
      default: "檢舉",
    },
    num: {
      type: Number,
      default: null,
    },
  },
  components: {
    Snackbar,
  },
  data() {
    return {
      valid: false,
      memNum: parseInt(this.$cookies.get("user_session")),
      content: "",
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
    async report() {
      try {
        if (this.title === "檢舉文章") {
          const res = await this.$api.post.reportPost(this.num, {
            memNum: this.memNum,
            reportReason: this.content,
          });
          if (res.message === "成功檢舉貼文") {
            this.setPopupStatus(true, { root: true });
            this.setPopupDetails(
              { popupMsgColor: "green", popupMsg: "已收到您的檢舉" },
              { root: true }
            );
            this.$emit("closeDialog");
          }
        }
        if (this.title === "檢舉留言") {
          const res = await this.$api.comment.reportComment(this.num, {
            memNum: this.memNum,
            reportReason: this.content,
          });
          if (res.message === "成功檢舉留言") {
            this.setPopupStatus(true, { root: true });
            this.setPopupDetails(
              { popupMsgColor: "green", popupMsg: "已收到您的檢舉" },
              { root: true }
            );
            this.$emit("closeDialog");
          }
        }
        if (this.title === "檢舉業務員") {
          const res = await this.$api.member.reportSalesman(this.num, {
            memNum: this.memNum,
            reportReason: this.content,
          });
          if (res.message === "成功檢舉業務員") {
            this.setPopupStatus(true, { root: true });
            this.setPopupDetails(
              { popupMsgColor: "green", popupMsg: "已收到您的檢舉" },
              { root: true }
            );
            this.$emit("closeDialog");
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    ...mapMutations({
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
};
</script>
