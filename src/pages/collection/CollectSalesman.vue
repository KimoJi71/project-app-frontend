<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <CollectBtn />
    <!-- 無資料時render -->
    <div v-if="isData">
      <v-row class="mt-15" align="center" justify="center">
        <v-icon color="grey" size="100">mdi-emoticon-neutral-outline</v-icon>
      </v-row>
      <v-row class="mt-10" align="center" justify="center">
        <span class="text-h5 grey--text">您還沒有收藏任何業務員喔！</span>
      </v-row>
    </div>

    <!-- 有資料時render -->
    <v-row class="mt-6 mx-6" align="center" justify="start" v-else>
      <v-col cols="12" md="3" v-for="salesman in salesmen" :key="salesman.name">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon v-if="salesman.memPhoto === null" dark large
                >mdi-account</v-icon
              >
              <v-img
                v-else
                cover
                :src="'http://localhost:3000/images\\' + salesman.memPhoto"
              />
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <router-link
              class="indigo--text text-h6 mb-3"
              :to="`/profile/${salesman.memNum}`"
              >{{ salesman.memName }}</router-link
            >
          </v-row>
          <v-card-text class="text-h6 grey--text">
            <v-row align="center" justify="center">
              {{ salesman.memCompany }}
            </v-row>
          </v-card-text>

          <v-divider class="mt-2 mb-3" />
          <div class="text-center">
            <v-badge
              :content="salesman.likeNum === 0 ? '0' : salesman.likeNum"
              color="red"
              offset-x="10"
              offset-y="10"
            >
              <v-btn icon @click="onLike(salesman.memNum, salesman.isLike)">
                <v-icon color="red">{{
                  salesman.isLike ? "mdi-heart" : "mdi-heart-outline"
                }}</v-icon>
              </v-btn>
            </v-badge>
            <v-btn icon @click="report(salesman.memNum)">
              <v-icon color="warning">mdi-alert</v-icon>
            </v-btn>
            <v-btn
              :id="`shareBtn${salesman.memNum}`"
              icon
              @click="copyLink(salesman.memNum)"
            >
              <v-icon color="success">mdi-share</v-icon>
            </v-btn>
            <v-btn icon @click="cancelCollect(salesman.memNum)">
              <v-icon color="blue">mdi-bookmark</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <DialogReport
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="'檢舉業務員'"
      :num="salesmanNum"
      @closeDialog="onCancel"
    />
    <Loading />
    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import DialogReport from "@/components/DialogReport.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CollectSalesman",
  components: {
    Header,
    CollectBtn,
    Snackbar,
    Loading,
    DialogReport,
  },
  data() {
    return {
      link: "",
      isData: false,
      dialogVisible: false,
      salesmanNum: null,
      memNum: parseInt(this.$cookies.get("user_permission")),
      salesmen: [],
    };
  },
  computed: {
    ...mapState({
      popupStatus: (state) => state.popupStatus,
      salesmanData: (state) => state.collection.salesmanData,
    }),
  },
  methods: {
    // 分享
    // 待修正：需要點擊兩次才會生效 而且點擊第二次成功後再點擊會疊加成功方法
    copyLink(memNum) {
      let shareBtn = document.querySelector(`#shareBtn${memNum}`);
      shareBtn.addEventListener("click", () => {
        let dummy = document.createElement("input");
        this.link = `http://localhost:8080/profile/${memNum}`;
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
    report(salesmanNum) {
      this.dialogVisible = true;
      this.salesmanNum = salesmanNum;
    },
    onCancel() {
      this.dialogVisible = false;
      this.salesmanNum = null;
    },
    // 業務員按讚相關
    async onLike(salesmanNum, isLike) {
      if (isLike) {
        try {
          const res = await this.$api.member.cancelLikeSalesman(
            salesmanNum,
            this.memNum
          );
          if (res.message === "成功取消業務員按讚") {
            this.salesmen.map((item) => {
              if (item.memNum === salesmanNum) {
                item.isLike = false;
                item.likeNum -= 1;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$api.member.likeSalesman(salesmanNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功為業務員按讚") {
            this.salesmen.map((item) => {
              if (item.memNum === salesmanNum) {
                item.isLike = true;
                item.likeNum += 1;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkLikeSalesman(salesman) {
      try {
        const res = await this.$api.member.checkLikeSalesman(
          salesman.memNum,
          this.memNum
        );
        if (res.message === "已按讚") {
          salesman.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 業務員收藏相關
    async cancelCollect(salesmanNum) {
      try {
        const res = await this.$api.collection.cancelCollectSalesman(
          salesmanNum,
          this.memNum
        );
        if (res.message === "成功取消業務員收藏") {
          this.getCollections();
          this.setPopupStatus(true, { root: true });
          this.setPopupDetails(
            { popupMsgColor: "green", popupMsg: "已移除收藏" },
            { root: true }
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCollections() {
      try {
        await this.getCollectSalesman(this.memNum);
        this.salesmen = this.salesmanData;
        if (this.salesmen.length === 0) this.isData = true;
        else {
          this.salesmen.map((item) => {
            this.checkLikeSalesman(item);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions({
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
    this.getCollections();
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
