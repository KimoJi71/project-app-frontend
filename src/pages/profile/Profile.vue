<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <!-- 側邊欄介紹 -->
    <v-row class="mt-4" justify="center">
      <v-col cols="12" md="2">
        <v-btn icon large v-if="screenWidth < 960" @click="show = !show">
          <v-icon large>mdi-dots-grid</v-icon>
        </v-btn>
        <v-card v-if="screenWidth > 960 || show">
          <v-list>
            <v-list-item>
              <v-list-item-avatar class="mx-auto" color="grey" size="85">
                <v-icon v-if="memPhoto === null" dark x-large
                  >mdi-account</v-icon
                >
                <v-img
                  v-else
                  cover
                  :src="'http://localhost:3000/images\\' + memPhoto"
                />
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pa-0 ma-0">
                <div align="center" justify="center">
                  <p class="text-h6">{{ profileInfo.memName }}</p>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="memNum === parseInt($cookies.get('user_permission'))"
            >
              <v-list-item-content>
                <v-row align="center" justify="center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="black"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="updateProfile()"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>編輯個人資料</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="ml-3"
                        color="black"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="goCollection()"
                      >
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>
                    </template>
                    <span>我的收藏</span>
                  </v-tooltip>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div v-if="profileInfo.memIdentify === 1">
            <v-divider />

            <v-list dense>
              <v-list-item
                two-line
                v-for="item in profileItem"
                :key="item.title"
              >
                <v-btn outlined icon :color="item.color">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
                <v-list-item-content class="ml-4">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.content ? item.content : "無"
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-row
              class="mt-4 pb-1"
              align="center"
              justify="center"
              v-if="memNum !== parseInt($cookies.get('user_permission'))"
            >
              <v-badge
                :content="profileInfo.likeNum === 0 ? '0' : profileInfo.likeNum"
                color="red"
                offset-x="10"
                offset-y="10"
              >
                <v-btn icon @click="onLikeSalesman(profileInfo.isLike)">
                  <v-icon color="red">{{
                    profileInfo.isLike ? "mdi-heart" : "mdi-heart-outline"
                  }}</v-icon>
                </v-btn>
              </v-badge>
              <v-btn icon @click="reportSalesman(profileInfo.memNum)">
                <v-icon color="warning">mdi-alert</v-icon>
              </v-btn>
              <v-btn
                id="shareSalesmanBtn"
                icon
                @click="copyLink(profileInfo.memNum, 'salesman')"
              >
                <v-icon color="success">mdi-share</v-icon>
              </v-btn>
              <v-btn icon @click="onCollectSalesman()">
                <v-icon color="blue">{{
                  profileInfo.isCollect
                    ? "mdi-bookmark"
                    : "mdi-bookmark-outline"
                }}</v-icon>
              </v-btn>
            </v-row>
          </div>
        </v-card>
      </v-col>

      <!-- 個人簡介 -->
      <v-col class="mt-3" cols="12" md="9">
        <v-row justify="center" v-if="profileInfo.memIntro">
          <v-card width="90%">
            <v-card-text class="black--text" style="white-space: pre-wrap">{{
              profileInfo.memIntro
            }}</v-card-text>
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-divider class="my-6 mx-11" v-if="profileInfo.memIntro" />
        </v-row>
        <!-- 文章 -->
        <div
          class="text-center"
          v-if="
            postsData.length === 0 &&
            memNum === parseInt($cookies.get('user_permission'))
          "
        >
          <v-col class="mt-2" cols="12" md="11">
            <v-icon color="grey" size="100"
              >mdi-emoticon-neutral-outline</v-icon
            >
          </v-col>
          <v-col class="mt-5" cols="12" md="11">
            <span class="text-h5 grey--text">您還沒有發佈任何文章喔！</span>
          </v-col>
        </div>
        <div class="text-center" v-else-if="postsData.length === 0">
          <v-col class="mt-2" cols="12" md="11">
            <v-icon color="grey" size="100"
              >mdi-emoticon-neutral-outline</v-icon
            >
          </v-col>
          <v-col class="mt-5" cols="12" md="11">
            <span class="text-h5 grey--text">該用戶還沒有發佈任何文章喔！</span>
          </v-col>
        </div>
        <v-row
          justify="center"
          v-for="post in postsData"
          :key="post.postNum"
          v-else
        >
          <v-card class="mb-4" width="90%" elevation="3">
            <v-card-text>
              <v-list-item-avatar color="grey">
                <v-icon v-if="memPhoto === null" dark>mdi-account</v-icon>
                <v-img
                  v-else
                  cover
                  :src="'http://localhost:3000/images\\' + memPhoto"
                />
              </v-list-item-avatar>
              <span
                >{{ post.memName }} ·
                {{
                  $moment(post.postCreateAt).format("YYYY/MM/DD HH:mm:ss")
                }}</span
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
              <v-menu
                offset-x
                rounded="lg"
                v-if="memNum === parseInt($cookies.get('user_permission'))"
              >
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
              <div class="mt-4 mb-0">
                <v-badge
                  :content="post.likeNumber === 0 ? '0' : post.likeNumber"
                  color="red"
                  offset-x="10"
                  offset-y="10"
                >
                  <v-btn icon @click="onLikePost(post.postNum, post.isLike)">
                    <v-icon color="red">{{
                      post.isLike ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon>
                  </v-btn>
                </v-badge>
                <v-btn icon @click="reportPost(post.postNum)">
                  <v-icon color="warning">mdi-alert</v-icon>
                </v-btn>
                <v-btn
                  :id="`sharePostBtn${post.postNum}`"
                  icon
                  @click="copyLink(post.postNum, 'post')"
                >
                  <v-icon color="success">mdi-share</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="onCollectPost(post.postNum, post.isCollect)"
                >
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
        </v-row>
      </v-col>
    </v-row>

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
    <Loading />
    <Snackbar />
    <BackBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import DialogReport from "@/components/DialogReport.vue";
import DialogLogin from "@/components/DialogLogin.vue";
import BackBtn from "@/components/BackBtn.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Profile",
  components: {
    Header,
    Snackbar,
    Loading,
    DialogReport,
    DialogLogin,
    BackBtn,
  },
  data() {
    return {
      link: "",
      loginDialogVisible: false,
      dialogVisible: false,
      dialogTitle: "",
      num: null,
      memNum: parseInt(this.$route.params.memNum),
      memPhoto: null,
      screenWidth: document.body.clientWidth,
      show: false,
      menuItems: [
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
      profileItem: [
        { icon: "mdi-domain", color: "red", title: "所屬公司", content: "" },
        {
          icon: "mdi-check",
          color: "blue-grey",
          title: "提供服務",
          content: "",
        },
        { icon: "mdi-phone", color: "blue", title: "電話", content: "" },
        { icon: "fab fa-line", color: "green", title: "Line ID", content: "" },
      ],
      profileInfo: {},
      postsData: [],
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      posts: (state) => state.post.posts,
      profile: (state) => state.member.profile,
    }),
  },
  methods: {
    // 分享
    // 待修正：需要點擊兩次才會生效 而且點擊第二次成功後再點擊會疊加成功方法
    copyLink(num, type) {
      let shareBtn = null;
      if (type === "post") {
        shareBtn = document.querySelector(`#sharePostBtn${num}`);
        this.link = `http://localhost:8080/posts/detail/${num}`;
      } else {
        shareBtn = document.querySelector("#shareSalesmanBtn");
        this.link = window.location.href;
      }
      shareBtn.addEventListener("click", () => {
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = this.link;
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
    reportSalesman(salesmanNum) {
      if (this.$cookies.get("user_permission")) {
        this.dialogVisible = true;
        this.dialogTitle = "檢舉業務員";
        this.num = salesmanNum;
      } else {
        this.loginDialogVisible = true;
      }
    },
    reportPost(postNum) {
      if (this.$cookies.get("user_permission")) {
        this.dialogVisible = true;
        this.dialogTitle = "檢舉文章";
        this.num = postNum;
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
    goDetail(postNum) {
      this.$router.push({ name: "PostDetail", params: { postNum: postNum } });
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
    async onLikePost(postNum, isLike) {
      if (this.$cookies.get("user_permission")) {
        if (isLike) {
          try {
            const res = await this.$api.post.cancelLikePost(
              postNum,
              parseInt(this.$cookies.get("user_permission"))
            );
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
              memNum: parseInt(this.$cookies.get("user_permission")),
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
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkLikePost(post) {
      try {
        const res = await this.$api.post.checkLikePost(
          post.postNum,
          parseInt(this.$cookies.get("user_permission"))
        );
        if (res.message === "已按讚") {
          post.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 文章收藏相關
    async onCollectPost(postNum, isCollect) {
      if (this.$cookies.get("user_permission")) {
        if (isCollect) {
          try {
            const res = await this.$api.collection.cancelCollectPost(
              postNum,
              parseInt(this.$cookies.get("user_permission"))
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
              memNum: parseInt(this.$cookies.get("user_permission")),
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
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkCollectPost(post) {
      const res = await this.getCollectPost(
        parseInt(this.$cookies.get("user_permission"))
      );
      res.map((item) => {
        if (item.postNum === post.postNum) post.isCollect = true;
      });
    },
    async getPostsInfo() {
      try {
        await this.getPosts();
        const data = this.posts.filter((item) => {
          return item.memNum === this.memNum;
        });
        this.postsData = data;
        if (this.$cookies.get("user_permission")) {
          this.postsData.map((item) => {
            this.checkLikePost(item);
            this.checkCollectPost(item);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 編輯個人資料
    updateProfile() {
      this.$router.push({
        name: "UpdateProfile",
        params: { memNum: this.memNum },
      });
    },
    goCollection() {
      this.$router.push({ name: "CollectPost" });
    },
    async getProfileInfo() {
      try {
        await this.getProfile(this.memNum);
        this.profileInfo = this.profile.data;
        this.memPhoto = this.profileInfo.memPhoto;
        if (this.profileInfo.memIdentify === 1) {
          this.profileItem[0].content = this.profileInfo.memCompany;
          this.profileItem[1].content = this.profileInfo.memService
            .split(",")
            .map((item) => item)
            .join(" / ");
          this.profileItem[2].content = this.profileInfo.memPhone;
          this.profileItem[3].content = this.profileInfo.memLineID;
          if (this.$cookies.get("user_permission")) {
            this.checkLikeSalesman();
            this.checkCollectSalesman();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 業務員按讚相關
    async onLikeSalesman(isLike) {
      if (this.$cookies.get("user_permission")) {
        if (isLike) {
          try {
            const res = await this.$api.member.cancelLikeSalesman(
              this.memNum,
              parseInt(this.$cookies.get("user_permission"))
            );
            if (res.message === "成功取消業務員按讚") {
              this.profileInfo.isLike = false;
              this.profileInfo.likeNum -= 1;
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await this.$api.member.likeSalesman(this.memNum, {
              memNum: parseInt(this.$cookies.get("user_permission")),
            });
            if (res.message === "成功為業務員按讚") {
              this.profileInfo.isLike = true;
              this.profileInfo.likeNum += 1;
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkLikeSalesman() {
      try {
        const res = await this.$api.member.checkLikeSalesman(
          this.memNum,
          parseInt(this.$cookies.get("user_permission"))
        );
        if (res.message === "已按讚") {
          this.profileInfo.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 業務員收藏相關
    async onCollectSalesman() {
      if (this.$cookies.get("user_permission")) {
        if (this.profileInfo.isCollect) {
          try {
            const res = await this.$api.collection.cancelCollectSalesman(
              this.profileInfo.memNum,
              parseInt(this.$cookies.get("user_permission"))
            );
            if (res.message === "成功取消業務員收藏") {
              this.profileInfo.isCollect = false;
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await this.$api.collection.collectSalesman(
              this.profileInfo.memNum,
              {
                memNum: parseInt(this.$cookies.get("user_permission")),
              }
            );
            if (res.message === "成功收藏了業務員") {
              this.profileInfo.isCollect = true;
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkCollectSalesman() {
      const res = await this.getCollectSalesman(
        parseInt(this.$cookies.get("user_permission"))
      );
      res.map((item) => {
        if (item.memNum === this.profileInfo.memNum)
          this.profileInfo.isCollect = true;
      });
    },
    ...mapActions({
      getPosts: "post/getPosts",
      getProfile: "member/getProfile",
      getCollectPost: "collection/getCollectPost",
      getCollectSalesman: "collection/getCollectSalesman",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  mounted() {
    if (this.memNum) {
      // 取得個人資料
      this.getProfileInfo();
      // 取得貼文
      this.getPostsInfo();
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
