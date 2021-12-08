<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <SearchResBtn />
    <!-- 無資料時render -->
    <div v-if="isData">
      <v-row class="mt-15" align="center" justify="center">
        <v-icon color="grey" size="100">mdi-emoticon-sad-outline</v-icon>
      </v-row>
      <v-row class="mt-10" align="center" justify="center">
        <span class="text-h5 grey--text">抱歉...沒有符合的搜尋結果</span>
      </v-row>
    </div>

    <!-- 有資料時render -->
    <v-card
      v-else
      class="mx-auto my-6"
      max-width="80%"
      elevation="3"
      v-for="post in postsData"
      :key="post.postNum"
    >
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon v-if="post.memPhoto === null" dark>mdi-account</v-icon>
          <v-img
            v-else
            contain
            :src="'http://localhost:3000/images\\' + post.memPhoto"
          />
        </v-list-item-avatar>
        <router-link class="indigo--text" :to="`/profile/${post.memNum}`">{{
          post.memName
        }}</router-link>
        <span>
          · {{ $moment(post.postCreateAt).format("YYYY/MM/DD HH:mm:ss") }}</span
        >
        <v-chip
          class="mx-3"
          color="grey"
          outlined
          small
          v-if="post.memIdentify === 0"
          >保戶</v-chip
        >
        <v-chip
          class="mx-3"
          color="grey"
          outlined
          small
          v-if="post.memIdentify === 1"
          >業務員</v-chip
        >
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
          <v-btn icon @click="report(post.postNum)">
            <v-icon color="warning">mdi-alert</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="success">mdi-share</v-icon>
          </v-btn>
          <v-btn icon @click="onCollect(post.postNum, post.isCollect)">
            <v-icon color="blue">{{
              post.isCollect ? "mdi-bookmark" : "mdi-bookmark-outline"
            }}</v-icon>
          </v-btn>
          <span class="mt-2" style="float: right"
            >共 {{ post.commentNumber }} 則留言</span
          >
        </div>
      </v-card-text>
    </v-card>

    <DialogReport
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="'檢舉文章'"
      :num="postNum"
      @closeDialog="onCancel"
    />
    <Loading />
    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import DialogReport from "@/components/DialogReport.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SearchPost",
  components: {
    Header,
    SearchResBtn,
    Snackbar,
    Loading,
    DialogReport,
  },
  data() {
    return {
      isData: false,
      dialogVisible: false,
      postNum: null,
      memNum: parseInt(this.$cookies.get("user_session")),
      postsData: [],
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      posts: (state) => state.search.posts,
    }),
  },
  methods: {
    report(postNum) {
      this.dialogVisible = true;
      this.postNum = postNum;
    },
    onCancel() {
      this.dialogVisible = false;
      this.postNum = null;
    },
    goDetail(postNum) {
      this.$router.push({ name: "PostDetail", params: { postNum: postNum } });
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
    // 文章收藏相關
    async onCollect(postNum, isCollect) {
      if (isCollect) {
        try {
          const res = await this.$api.collection.cancelCollectPost(
            postNum,
            this.memNum
          );
          if (res.message === "成功取消貼文收藏") {
            this.postsData.map((item) => {
              if (item.postNum === postNum) {
                item.isCollect = false;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$api.collection.collectPost(postNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功收藏了貼文") {
            this.postsData.map((item) => {
              if (item.postNum === postNum) {
                item.isCollect = true;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkCollectPost(post) {
      const res = await this.getCollectPost(this.memNum);
      res.map((item) => {
        if (item.postNum === post.postNum) post.isCollect = true;
      });
    },
    async getSearchResult() {
      const keywords = localStorage.getItem("keywords");
      try {
        await this.getSearchPost(keywords);
        this.postsData = this.posts;
        if (this.postsData.length === 0) this.isData = true;
        else {
          this.postsData.map((item) => {
            this.checkLikePost(item);
            this.checkCollectPost(item);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions({
      getSearchPost: "search/getSearchPost",
      getCollectPost: "collection/getCollectPost",
    }),
    ...mapMutations({
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  mounted() {
    this.getSearchResult();
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
