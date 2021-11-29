<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto mt-6" max-width="80%" elevation="3">
      <v-card-title>編輯貼文</v-card-title>
      <v-divider class="ml-4" />
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <span style="font-size: 18px">{{ postData.memName }}</span>
        <v-row class="mx-1 mt-4">
          <v-textarea
            outlined
            rows="10"
            no-resize
            v-model="postData.postContent"
          />
        </v-row>
        <v-row align="center" justify="center" class="mb-4">
          <v-btn class="mr-10" color="grey" outlined @click="goBack()"
            >返回</v-btn
          >
          <v-btn color="blue darken-2" dark depressed @click="update()"
            >儲存</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "UpdatePost",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      postNum: parseInt(this.$route.params.postNum),
      postData: {
        postContent: "",
        memName: null,
        memPhoto: null,
      },
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      posts: (state) => state.post.posts,
    }),
  },
  methods: {
    async update() {
      try {
        const res = await this.$api.post.updatePost(this.postNum, {
          postContent: this.postData.postContent,
        });
        if (res.message === "文章編輯成功") {
          this.$router.back(-1);
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "文章編輯成功" },
            { root: true }
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    ...mapActions({
      getPosts: "post/getPosts",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  async mounted() {
    try {
      await this.getPosts();
      const data = this.posts.filter((item) => {
        return item.postNum === this.postNum;
      });
      this.postData.postContent = data[0].postContent;
      this.postData.memName = data[0].memName;
      this.postData.memPhoto = data[0].memPhoto;
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
