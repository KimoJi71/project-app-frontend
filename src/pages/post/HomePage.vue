<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card
      class="mx-auto my-6"
      max-width="80%"
      elevation="3"
      v-for="post in postsData"
      :key="post.postNum"
    >
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <router-link class="indigo--text" :to="`/profile/${post.memNum}`">{{
          post.memName
        }}</router-link>
        <span>
          · {{ $moment(post.postCreateAt).format("YYYY/MM/DD HH:mm:ss") }}</span
        >
        <v-menu offset-x rounded="lg" v-if="post.memNum === memNum">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" icon right absolute v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, idx) in menuItems"
              :key="idx"
              @click="item.action(post.postNum)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div
          class="black--text mt-2"
          style="cursor: pointer"
          @click="goDetail(post.postNum)"
        >
          <span style="white-space: pre-wrap">{{
            post.postContent.length > 50
              ? post.postContent.slice(0, 50)
              : post.postContent
          }}</span>
          <span
            class="text-decoration-underline primary--text"
            v-if="post.postContent.length > 50"
            >...READ MORE</span
          >
        </div>
        <v-divider class="mt-4" />
        <div class="mt-3">
          <v-badge
            :content="post.likeNumber === 0 ? '0' : post.likeNumber"
            color="red"
            offset-x="10"
            offset-y="10"
          >
            <v-btn icon @click="onLike(post.postNum, post.isLike)">
              <v-icon color="red">{{
                post.isLike ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </v-btn>
          </v-badge>
          <v-btn icon>
            <v-icon color="warning">mdi-alert</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="success">mdi-share</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="blue">mdi-bookmark-outline</v-icon>
          </v-btn>
          <span class="mt-2" style="float: right"
            >共 {{ post.commentNumber }} 則留言</span
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- 新增貼文浮動按鈕 -->
    <v-tooltip top v-if="memNum">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-1"
          dark
          fixed
          right
          bottom
          fab
          v-bind="attrs"
          v-on="on"
          @click="createPost()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>新增貼文</span>
    </v-tooltip>

    <Loading />
    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "HomePage",
  components: {
    Header,
    Snackbar,
    Loading,
  },
  data() {
    return {
      memNum: parseInt(this.$cookies.get("user_session")),
      menuItems: [
        { title: "編輯", action: (postNum) => this.updatePost(postNum) },
        { title: "刪除", action: (postNum) => this.deletePost(postNum) },
      ],

      postsData: [],
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
    }),
  },
  methods: {
    goDetail(postNum) {
      this.$router.push({ name: "PostDetail", params: { postNum: postNum } });
    },
    createPost() {
      this.$router.push({ name: "CreatePost" });
    },
    updatePost(postNum) {
      this.$router.push({ name: "UpdatePost", params: { postNum: postNum } });
    },
    async deletePost(postNum) {
      try {
        const res = await this.$api.post.deletePost(postNum);
        if (res.message === "文章刪除成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "文章刪除成功" },
            { root: true }
          );
          // 刷新頁面
          this.getPostsInfo();
        }
      } catch (err) {
        this.setPopupStatus(true, { root: true });
        this.setPopupDetails(
          { popupMsgColor: "red", popupMsg: "文章刪除失敗" },
          { root: true }
        );
        console.log(err);
      }
    },
    // 文章按讚相關
    async onLike(postNum, isLike) {
      if (isLike) {
        try {
          const res = await this.$api.post.cancelLikePost(postNum, this.memNum);
          if (res.message === "成功取消貼文按讚") {
            this.postsData.map((item) => {
              if (item.postNum === postNum) {
                item.isLike = false;
                item.likeNumber -= 1;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$api.post.likePost(postNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功為貼文按讚") {
            this.postsData.map((item) => {
              if (item.postNum === postNum) {
                item.isLike = true;
                item.likeNumber += 1;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkLikePost(post) {
      try {
        const res = await this.$api.post.checkLikePost(
          post.postNum,
          this.memNum
        );
        if (res.message === "已按讚") {
          post.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getPostsInfo() {
      try {
        const res = await this.getPosts();
        this.postsData = res;
        this.postsData.map((item) => {
          this.checkLikePost(item);
        });
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions({
      getPosts: "post/getPosts",
      // likePost: "post/likePost",
      cancelLikePost: "post/cancelLikePost",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  async mounted() {
    this.getPostsInfo();
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
