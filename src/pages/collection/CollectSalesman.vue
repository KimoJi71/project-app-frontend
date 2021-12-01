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
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6">{{ salesman.memName }}</span>
          </v-row>

          <v-divider class="mt-4 mb-2" />
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
            <v-btn icon>
              <v-icon color="success">mdi-share</v-icon>
            </v-btn>
            <v-btn icon>
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
    <BackBtn />
    <Loading />
    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";
import BackBtn from "@/components/BackBtn.vue";
import Snackbar from "@/components/Snackbar.vue";
import Loading from "@/components/Loading.vue";
import DialogReport from "@/components/DialogReport.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CollectSalesman",
  components: {
    Header,
    CollectBtn,
    BackBtn,
    Snackbar,
    Loading,
    DialogReport,
  },
  data() {
    return {
      isData: false,
      dialogVisible: false,
      salesmanNum: null,
      memNum: parseInt(this.$cookies.get("user_session")),
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
    ...mapActions({
      getCollectSalesman: "collection/getCollectSalesman",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
    }),
  },
  async mounted() {
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
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
