<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto mt-6" max-width="80%" elevation="3">
      <v-card-title>新增文章</v-card-title>
      <v-divider class="ml-4" />
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon v-if="memPhoto === null" dark>mdi-account</v-icon>
          <v-img
            v-else
            contain
            :src="'http://localhost:3000/images\\' + memPhoto"
          />
        </v-list-item-avatar>
        <span style="font-size: 18px">{{ memName }}</span>
        <v-row class="mx-1 mt-4">
          <v-textarea
            label="請撰寫敘述......"
            outlined
            rows="10"
            no-resize
            v-model="postContent"
          />
        </v-row>
        <v-row align="center" justify="center" class="mb-4">
          <v-btn class="mr-10" color="grey" outlined @click="goBack()"
            >返回</v-btn
          >
          <v-btn color="blue darken-2" dark depressed @click="save()"
            >儲存</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "CreatePost",
  components: {
    Header,
  },
  data() {
    return {
      postContent: "",
      memName: "",
      memPhoto: null,
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      profile: (state) => state.member.profile,
    }),
  },
  methods: {
    async save() {
      try {
        const res = await this.$api.post.createPost({
          memNum: this.$cookies.get("user_session"),
          postContent: this.postContent,
        });
        if (res.message === "文章新增成功") {
          this.$router.push({ name: "HomePage" });
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "文章新增成功" },
            { root: true }
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.push({ name: "HomePage" });
    },
    ...mapActions({
      getProfile: "member/getProfile",
    }),
    ...mapMutations({
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  async mounted() {
    try {
      await this.getProfile(this.$cookies.get("user_session"));
      this.memName = this.profile.data.memName;
      this.memPhoto = this.profile.data.memPhoto;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
