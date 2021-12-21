<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <!-- 文章內容 -->
    <v-card class="mx-auto my-6" max-width="75%" elevation="3">
      <v-card-text>
        <v-row>
          <v-col>
            <v-list-item-avatar color="grey">
              <v-icon v-if="postData.memPhoto === null" dark
                >mdi-account</v-icon
              >
              <v-img
                v-else
                cover
                :src="'http://localhost:3000/images\\' + postData.memPhoto"
              />
            </v-list-item-avatar>
            <router-link
              class="indigo--text"
              :to="`/profile/${postData.memNum}`"
            >
              {{ postData.memName }}
            </router-link>
            <span>
              ·
              {{
                $moment(postData.postCreateAt).format("YYYY/MM/DD HH:mm:ss")
              }}</span
            >
            <v-chip
              class="mx-3"
              color="grey"
              outlined
              small
              v-if="postData.memIdentify === 0"
              >保戶</v-chip
            >
            <v-chip
              class="mx-3"
              color="grey"
              outlined
              small
              v-if="postData.memIdentify === 1"
              >業務員</v-chip
            >
            <v-menu offset-x rounded="lg" v-if="postData.memNum === memNum">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
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
                  v-for="(item, idx) in postMenuItems"
                  :key="idx"
                  @click="item.action(postData.postNum)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <div class="black--text mt-2">
              <!--  eslint-disable-next-line prettier/prettier -->
              <span style="white-space: pre-wrap">{{ postData.postContent }}</span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-4" />

        <div :class="commentsData.length !== 0 ? 'mt-3 mb-2' : 'mt-3'">
          <v-badge
            :content="postData.likeNumber === 0 ? '0' : postData.likeNumber"
            color="red"
            offset-x="10"
            offset-y="10"
          >
            <v-btn icon @click="onLikePost()">
              <v-icon color="red">{{
                postData.isLike ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </v-btn>
          </v-badge>
          <v-btn icon @click="reportPost(postData.postNum)">
            <v-icon color="warning">mdi-alert</v-icon>
          </v-btn>
          <v-btn id="shareBtn" icon @click="copyLink()">
            <v-icon color="success">mdi-share</v-icon>
          </v-btn>
          <v-btn icon @click="onCollect()">
            <v-icon color="blue">{{
              postData.isCollect ? "mdi-bookmark" : "mdi-bookmark-outline"
            }}</v-icon>
          </v-btn>
          <span class="mt-2" style="float: right"
            >共 {{ postData.commentNumber }} 則留言</span
          >
        </div>

        <v-divider class="mt-2" v-if="memNum" />

        <!-- 留言區塊 -->
        <v-row class="mt-4" v-if="memNum">
          <v-col class="d-flex" cols="12">
            <v-avatar class="mt-3" color="grey" size="40">
              <v-icon v-if="memPhoto === null" dark>mdi-account</v-icon>
              <v-img
                v-else
                cover
                :src="'http://localhost:3000/images\\' + memPhoto"
              />
            </v-avatar>
            <v-textarea
              label="回應......"
              class="mx-4"
              append-icon="mdi-send"
              no-resize
              rows="2"
              outlined
              rounded
              v-model="commentContent"
              @click:append="createComment(postData.postNum)"
            />
          </v-col>
        </v-row>

        <v-divider class="mb-2" v-if="commentsData.length !== 0" />

        <div v-for="(comment, idx) in commentsData" :key="idx">
          <v-row>
            <v-col>
              <v-list-item-avatar color="grey">
                <v-icon v-if="comment.memPhoto === null" dark
                  >mdi-account</v-icon
                >
                <v-img
                  v-else
                  cover
                  :src="'http://localhost:3000/images\\' + comment.memPhoto"
                />
              </v-list-item-avatar>
              <router-link
                class="indigo--text"
                :to="`/profile/${comment.memNum}`"
                >{{ comment.memName }}</router-link
              >
              <span>
                ·
                {{
                  $moment(comment.commentCreateAt).format("YYYY/MM/DD HH:mm:ss")
                }}</span
              >
              <v-chip
                class="mx-3"
                color="grey"
                outlined
                small
                v-if="comment.memIdentify === 0"
                >保戶</v-chip
              >
              <v-chip
                class="mx-3"
                color="grey"
                outlined
                small
                v-if="comment.memIdentify === 1"
                >業務員</v-chip
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
                    v-for="(item, idx) in commentMenuItems"
                    :key="idx"
                    @click="item.action(comment.commentNum)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div class="black--text mb-2 ml-14">
                <v-textarea
                  v-if="isEdit && comment.memNum === memNum"
                  placeholder="請輸入內容"
                  class="mr-4"
                  append-icon="mdi-pencil"
                  no-resize
                  rows="4"
                  outlined
                  rounded
                  v-model="comment.commentContent"
                  @click:append="
                    updateComment(comment.commentNum, comment.commentContent)
                  "
                />
                <!-- eslint-disable-next-line prettier/prettier -->
                <span v-else style="white-space: pre-wrap">{{ comment.commentContent }}</span>
              </div>
              <div class="mt-4 mb-1 ml-12">
                <v-badge
                  :content="comment.likeNumber === 0 ? '0' : comment.likeNumber"
                  color="red"
                  offset-x="10"
                  offset-y="10"
                >
                  <v-btn
                    icon
                    color="red"
                    @click="onLikeComment(comment.commentNum, comment.isLike)"
                  >
                    <v-icon>{{
                      comment.isLike ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon>
                  </v-btn>
                </v-badge>
                <v-btn
                  class="ml-2"
                  icon
                  color="warning"
                  @click="reportComment(comment.commentNum)"
                >
                  <v-icon>mdi-alert</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-2" v-if="idx < commentsData.length - 1" />
        </div>
      </v-card-text>
    </v-card>

    <DialogReport
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="dialogTitle"
      :num="num"
      @closeDialog="onCancel"
    />
    <DialogLogin
      :visible.sync="loginDialogVisible"
      v-if="loginDialogVisible"
      @closeDialog="onCancelDialogLogin"
    />
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
import DialogReport from "@/components/DialogReport.vue";
import DialogLogin from "@/components/DialogLogin.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "PostDetail",
  components: {
    Header,
    Snackbar,
    Loading,
    BackBtn,
    DialogReport,
    DialogLogin,
  },
  data() {
    return {
      loginDialogVisible: false,
      dialogVisible: false,
      dialogTitle: "",
      num: null,
      postMenuItems: [
        {
          title: "編輯",
          action: (postNum) =>
            this.$router.push({
              name: "UpdatePost",
              params: { postNum: postNum },
            }),
        },
        { title: "刪除", action: (postNum) => this.deletePost(postNum) },
      ],
      commentMenuItems: [
        {
          title: "編輯",
          action: () => (this.isEdit = true),
        },
        {
          title: "刪除",
          action: (commentNum) => this.deleteComment(commentNum),
        },
      ],
      memNum: parseInt(this.$cookies.get("user_permission")),
      memPhoto: null,
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
        memIdentify: null,
        likeNumber: 0,
        commentNumber: 0,
        isLike: false,
        isCollect: false,
      },
      commentsData: [],
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      posts: (state) => state.post.posts,
      comments: (state) => state.comment.comments,
      profile: (state) => state.member.profile,
    }),
  },
  methods: {
    // 分享
    // 待修正：需要點擊兩次才會生效 而且點擊第二次成功後再點擊會疊加成功方法
    copyLink() {
      let shareBtn = document.querySelector(`#shareBtn`);
      shareBtn.addEventListener("click", () => {
        let dummy = document.createElement("input");
        let link = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = link;
        dummy.select();

        try {
          let successful = document.execCommand("copy");
          if (successful) {
            this.setPopupStatus(true, { root: true });
            this.setPopupDetails(
              { popupMsgColor: "green", popupMsg: "連結已複製" },
              { root: true }
            );
          } else {
            this.setPopupStatus(true, { root: true });
            this.setPopupDetails(
              { popupMsgColor: "red", popupMsg: "連結複製失敗" },
              { root: true }
            );
          }
        } catch (err) {
          console.log(err);
        }
      });
    },
    // 檢舉
    reportPost(postNum) {
      if (this.memNum) {
        this.dialogVisible = true;
        this.dialogTitle = "檢舉文章";
        this.num = postNum;
      } else {
        this.loginDialogVisible = true;
      }
    },
    reportComment(commentNum) {
      if (this.memNum) {
        this.dialogVisible = true;
        this.dialogTitle = "檢舉留言";
        this.num = commentNum;
      } else {
        this.loginDialogVisible = true;
      }
    },
    onCancel() {
      this.dialogVisible = false;
      this.num = null;
    },
    onCancelDialogLogin() {
      this.loginDialogVisible = false;
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
          this.$router.back(-1);
        }
      } catch (err) {
        console.log(err);
      }
    },
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
    async onLikePost() {
      if (this.memNum) {
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
      } else {
        this.loginDialogVisible = true;
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
    // 文章收藏相關
    async onCollect() {
      if (this.memNum) {
        if (this.postData.isCollect) {
          try {
            const res = await this.$api.collection.cancelCollectPost(
              this.postData.postNum,
              this.memNum
            );
            if (res.message === "成功取消貼文收藏")
              this.postData.isCollect = false;
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await this.$api.collection.collectPost(
              this.postData.postNum,
              {
                memNum: this.memNum,
              }
            );
            if (res.message === "成功收藏了貼文")
              this.postData.isCollect = true;
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkCollectPost() {
      const res = await this.getCollectPost(this.memNum);
      res.map((item) => {
        if (item.postNum === this.postData.postNum)
          this.postData.isCollect = true;
      });
    },
    // 留言按讚相關
    async onLikeComment(commentNum, isLike) {
      if (this.memNum) {
        if (isLike) {
          try {
            const res = await this.$api.comment.cancelLikeComment(
              commentNum,
              this.memNum
            );
            if (res.message === "成功取消留言按讚") {
              this.commentsData.map((item) => {
                if (item.commentNum === commentNum) {
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
            const res = await this.$api.comment.likeComment(commentNum, {
              memNum: this.memNum,
            });
            if (res.message === "成功為留言按讚") {
              this.commentsData.map((item) => {
                if (item.commentNum === commentNum) {
                  item.isLike = true;
                  item.likeNumber += 1;
                }
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkLikeComment(comment) {
      const res = await this.$api.comment.checkLikeComment(
        comment.commentNum,
        this.memNum
      );
      if (res.message === "已按讚") comment.isLike = true;
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
        if (this.memNum) {
          this.checkLikePost();
          this.checkCollectPost();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCommentsInfo() {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("Loading...", { root: true });
        await this.getComments(this.postData.postNum);
        this.commentsData = this.comments;
        if (this.memNum) {
          this.commentsData.map((item) => {
            this.checkLikeComment(item);
          });
        }
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("", { root: true });
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions({
      getPosts: "post/getPosts",
      getComments: "comment/getComments",
      getCollectPost: "collection/getCollectPost",
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
    // 取得用戶頭像
    if (this.memNum) {
      const res = this.$store.dispatch("member/getProfile", this.memNum);
      res.then((result) => {
        this.memPhoto = result.data.memPhoto;
      });
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
