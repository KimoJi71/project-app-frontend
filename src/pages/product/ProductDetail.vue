<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="70%" elevation="3">
      <v-card-title
        >{{ tableData.proCompany }} |
        {{
          tableData.proName.match(tableData.proCompany)
            ? tableData.proName.slice(4)
            : tableData.proName
        }}</v-card-title
      >
      <v-card-text>
        <v-chip color="red" label outlined v-if="tableData.proBigItem !== ''">
          {{
            tableData.proBigItem
              .split(",")
              .map((item) => item)
              .join("、")
          }}
        </v-chip>
        <v-chip
          class="ml-3"
          color="success"
          label
          outlined
          v-if="tableData.proKind !== ''"
        >
          {{ tableData.proKind }}
        </v-chip>
        <v-chip
          class="ml-3"
          color="blue"
          label
          outlined
          v-if="tableData.proPeriod !== ''"
        >
          {{
            tableData.proPeriod
              .split(",")
              .map((item) => item)
              .join("、")
          }}
        </v-chip>

        <v-list>
          <v-list-item class="pa-0" v-if="tableData.proRemark">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                備註
              </v-list-item-title>
              <div class="mt-3 pl-9">
                <ul>
                  <li
                    v-for="(proRemark, idx) in tableData.proRemark.split(',')"
                    :key="idx"
                    :class="idx === 0 ? '' : 'mt-3'"
                  >
                    {{ proRemark }}
                  </li>
                </ul>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pa-0" v-if="tableData.proFeature">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                商品特色
              </v-list-item-title>
              <div class="mt-3 pl-9">
                <ul>
                  <li
                    v-for="(proFeature, idx) in tableData.proFeature.split(',')"
                    :key="idx"
                    :class="idx === 0 ? '' : 'mt-3'"
                  >
                    {{ proFeature }}
                  </li>
                </ul>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pa-0" v-if="tableData.proContent">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                保障內容
              </v-list-item-title>
              <span class="mt-3 pl-9">
                {{
                  tableData.proContent
                    .split(",")
                    .map((item) => item)
                    .join(" / ")
                }}
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                附加檔案
              </v-list-item-title>
              <div class="mt-3 ml-9">
                <v-tooltip bottom v-if="tableData.proDM">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="blue"
                      fab
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :href="tableData.proDM"
                      target="_blank"
                    >
                      <v-icon>mdi-clipboard-minus</v-icon>
                    </v-btn>
                  </template>
                  <span>DM</span>
                </v-tooltip>
                <v-tooltip bottom v-if="tableData.proTerms">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :class="tableData.proDM ? 'ml-5' : ''"
                      color="green"
                      fab
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :href="tableData.proTerms"
                      target="_blank"
                    >
                      <v-icon>mdi-file-document</v-icon>
                    </v-btn>
                  </template>
                  <span>條款</span>
                </v-tooltip>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider class="ml-4" />

      <div class="mt-2 ml-2">
        <v-badge
          :content="tableData.likeNumber === 0 ? '0' : tableData.likeNumber"
          color="red"
          offset-x="10"
          offset-y="10"
        >
          <v-btn class="mb-2" icon @click="onLike()">
            <v-icon color="red">{{
              tableData.isLike ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </v-btn>
        </v-badge>
        <v-btn id="shareBtn" class="mb-2" icon @click="copyLink">
          <v-icon color="success">mdi-share</v-icon>
        </v-btn>
        <v-btn class="mb-2" icon @click="onCollect()">
          <v-icon color="blue">{{
            tableData.isCollect ? "mdi-bookmark" : "mdi-bookmark-outline"
          }}</v-icon>
        </v-btn>
      </div>
    </v-card>

    <DialogLogin
      :visible.sync="loginDialogVisible"
      v-if="loginDialogVisible"
      @closeDialog="onCancelDialogLogin"
    />
    <BackBtn />
    <Loading />
    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import BackBtn from "@/components/BackBtn.vue";
import DialogLogin from "@/components/DialogLogin.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ProductDetail",
  components: {
    Header,
    Snackbar,
    Loading,
    BackBtn,
    DialogLogin,
  },
  data() {
    return {
      loginDialogVisible: false,
      memNum: parseInt(this.$cookies.get("user_permission")),
      tableData: {
        proNum: parseInt(this.$route.params.proNum),
        proCompany: "",
        proBigItem: "",
        proSmallItem: "",
        proKind: "",
        proPeriod: "",
        proName: "",
        proRemark: "",
        proFeature: "",
        proContent: "",
        proDM: "",
        proTerms: "",
        proStatus: "",
        likeNumber: 0,
        isLike: false,
        isCollect: false,
      },
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      productInfo: (state) => state.product.productInfo,
    }),
  },
  methods: {
    // 分享
    // 待修正：需要點擊兩次才會生效 而且點擊第二次成功後再點擊會疊加成功方法
    copyLink() {
      let shareBtn = document.querySelector("#shareBtn");
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
    goBack() {
      this.$router.back(-1);
    },
    onCancelDialogLogin() {
      this.loginDialogVisible = false;
    },
    // 商品按讚相關
    async onLike() {
      if (this.memNum) {
        if (this.tableData.isLike) {
          try {
            const res = await this.$api.product.cancelLikeProduct(
              this.tableData.proNum,
              this.memNum
            );
            if (res.message === "成功取消商品按讚") {
              this.tableData.isLike = false;
              this.tableData.likeNumber -= 1;
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await this.$api.product.likeProduct(
              this.tableData.proNum,
              {
                memNum: this.memNum,
              }
            );
            if (res.message === "成功為商品按讚") {
              this.tableData.isLike = true;
              this.tableData.likeNumber += 1;
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkLikeProduct() {
      try {
        const res = await this.$api.product.checkLikeProduct(
          this.tableData.proNum,
          this.memNum
        );
        if (res.message === "已按讚") {
          this.tableData.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 商品收藏相關
    async onCollect() {
      if (this.memNum) {
        if (this.tableData.isCollect) {
          try {
            const res = await this.$api.collection.cancelCollectProduct(
              this.tableData.proNum,
              this.memNum
            );
            if (res.message === "成功取消商品收藏") {
              this.tableData.isCollect = false;
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await this.$api.collection.collectProduct(
              this.tableData.proNum,
              {
                memNum: this.memNum,
              }
            );
            if (res.message === "成功收藏了商品") {
              this.tableData.isCollect = true;
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        this.loginDialogVisible = true;
      }
    },
    async checkCollectProduct() {
      const res = await this.getCollectProduct(this.memNum);
      res.map((item) => {
        if (item.proNum === this.tableData.proNum)
          this.tableData.isCollect = true;
      });
    },
    ...mapActions({
      getProductInfo: "product/getProductInfo",
      getCollectProduct: "collection/getCollectProduct",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
      setPopupStatus: "setPopupStatus",
      setPopupDetails: "setPopupDetails",
    }),
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/products") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  async mounted() {
    try {
      await this.getProductInfo("");
      const data = this.productInfo.filter((item) => {
        return item.proNum === parseInt(this.$route.params.proNum);
      });
      this.tableData = data[0];
      if (this.memNum) {
        this.checkLikeProduct();
        this.checkCollectProduct();
      }
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
