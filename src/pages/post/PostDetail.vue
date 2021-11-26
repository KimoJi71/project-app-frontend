<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <!-- 文章內容 -->
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-card-text>
        <v-row>
          <v-col>
            <v-list-item-avatar color="grey">
              <v-icon dark>mdi-account</v-icon>
            </v-list-item-avatar>
            <span
              >{{ postData.memName }} ·
              {{
                $moment(postData.postCreateAt).format("YYYY/MM/DD HH:mm:ss")
              }}</span
            >
            <div class="black--text mt-2">
              <!--  eslint-disable-next-line prettier/prettier -->
              <span style="white-space: pre-wrap">{{ postData.postContent }}</span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-4" />

        <div class="mt-3">
          <v-badge
            :content="postData.likeNumber === 0 ? '0' : postData.likeNumber"
            color="red"
            offset-x="10"
            offset-y="10"
          >
            <v-btn icon @click="onLike()">
              <v-icon color="red">{{
                postData.isLike ? "mdi-heart" : "mdi-heart-outline"
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
            >共 {{ postData.commentNumber }} 則留言</span
          >
        </div>

        <v-divider class="mt-2" />

        <!-- 留言區塊 -->
        <v-row class="mt-4">
          <v-col class="d-flex" cols="12">
            <v-list-item-avatar color="grey">
              <v-icon dark>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-textarea
              label="回應......"
              class="mr-4"
              append-icon="mdi-send"
              no-resize
              rows="2"
              outlined
              v-model="commentContent"
              @click:append="createComment(postData.postNum)"
            />
          </v-col>
        </v-row>

        <v-divider class="mb-2" v-if="comments.length !== 0" />

        <div v-for="(comment, idx) in comments" :key="idx">
          <v-row>
            <v-col>
              <v-list-item-avatar color="grey">
                <v-icon dark>mdi-account</v-icon>
              </v-list-item-avatar>
              <span
                >{{ comment.memName }} ·
                {{
                  $moment(comment.commentCreateAt).format("YYYY/MM/DD HH:mm:ss")
                }}</span
              >
              <v-menu offset-x rounded="lg" v-if="comment.memNum === memNum">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mt-2"
                    color="grey"
                    icon
                    right
                    absolute
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, idx) in menuItems"
                    :key="idx"
                    @click="item.action(comment.commentNum)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div class="black--text mb-4 ml-14">
                <v-textarea
                  v-if="isEdit && comment.memNum === memNum"
                  placeholder="請輸入內容"
                  class="mr-4"
                  append-icon="mdi-pencil"
                  no-resize
                  rows="2"
                  outlined
                  v-model="comment.commentContent"
                  @click:append="
                    updateComment(comment.commentNum, comment.commentContent)
                  "
                />
                <!-- eslint-disable-next-line prettier/prettier -->
                <span v-else style="white-space: pre-wrap">{{ comment.commentContent }}</span>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-2" v-if="idx < comments.length - 1" />
        </div>
      </v-card-text>
    </v-card>

    <Snackbar />
    <BackBtn />
    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import BackBtn from "@/components/BackBtn.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "PostDetail",
  components: {
    Header,
    Snackbar,
    Loading,
    BackBtn,
  },
  data() {
    return {
      menuItems: [
        {
          title: "編輯",
          action: () => (this.isEdit = true),
        },
        {
          title: "刪除",
          action: (commentNum) => this.deleteComment(commentNum),
        },
      ],
      memNum: parseInt(this.$cookies.get("user_session")),
      commentContent: "",
      isEdit: false,
      postData: {
        postNum: parseInt(this.$route.params.postNum),
        postContent: "",
        postCreateAt: null,
        postUpdateAt: null,
        memNum: null,
        memName: null,
        memPhoto: null,
        likeNumber: 0,
        commentNumber: 0,
        isLike: false,
      },
      comments: {},
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      posts: (state) => state.post.posts,
    }),
  },
  methods: {
    async createComment(postNum) {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("Loading...", { root: true });
        const res = await this.$api.comment.createComment(postNum, {
          memNum: this.memNum,
          commentContent: this.commentContent,
        });
        if (res.message === "留言新增成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "留言新增成功" },
            { root: true }
          );
          // 刷新頁面
          this.commentContent = "";
          this.getPostsInfo();
          this.getCommentsInfo();
          this.setLoadingStatus(null, { root: true });
          this.setLoadingMsg("", { root: true });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateComment(commentNum, commentContent) {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("Loading...", { root: true });
        const res = await this.$api.comment.updateComment(commentNum, {
          commentContent,
        });
        if (res.message === "留言編輯成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "留言編輯成功" },
            { root: true }
          );
          this.setLoadingStatus(null, { root: true });
          this.setLoadingMsg("", { root: true });
        }
      } catch (err) {
        console.log(err);
      }
      this.isEdit = false;
    },
    async deleteComment(commentNum) {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("Loading...", { root: true });
        const res = await this.$api.comment.deleteComment(commentNum);
        if (res.message === "留言刪除成功") {
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "留言刪除成功" },
            { root: true }
          );
          // 刷新頁面
          this.getPostsInfo();
          this.getCommentsInfo();
          this.setLoadingStatus(null, { root: true });
          this.setLoadingMsg("", { root: true });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 文章按讚相關
    async onLike() {
      if (this.postData.isLike) {
        try {
          const res = await this.$api.post.cancelLikePost(
            this.postData.postNum,
            this.memNum
          );
          if (res.message === "成功取消貼文按讚") {
            this.postData.isLike = false;
            this.postData.likeNumber -= 1;
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$api.post.likePost(this.postData.postNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功為貼文按讚") {
            this.postData.isLike = true;
            this.postData.likeNumber += 1;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkLikePost() {
      try {
        const res = await this.$api.post.checkLikePost(
          this.postData.postNum,
          this.memNum
        );
        if (res.message === "已按讚") {
          this.postData.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    async getPostsInfo() {
      try {
        await this.getPosts();
        const data = this.posts.filter((item) => {
          return item.postNum === this.postData.postNum;
        });
        this.postData = data[0];
        this.checkLikePost();
      } catch (err) {
        console.log(err);
      }
    },
    async getCommentsInfo() {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("Loading...", { root: true });
        const res = await this.$api.comment.getComments(this.postData.postNum);
        this.comments = res;
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("", { root: true });
      } catch (err) {
        console.log(err);
      }
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
    // 取得文章詳細內容
    this.getPostsInfo();
    // 取得留言
    this.getCommentsInfo();
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
