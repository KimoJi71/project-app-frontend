/* eslint-disable prettier/prettier */
<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-row class="mt-4" justify="center">
      <!-- 篩選區塊 -->
      <v-col cols="12" md="3">
        <v-btn icon large v-if="screenWidth < 960" @click="show = !show">
          <v-icon large>mdi-dots-grid</v-icon>
        </v-btn>
        <v-card
          color="#FFE0B2"
          tile
          elevation="0"
          v-if="screenWidth > 960 || show"
        >
          <v-card-text>
            <v-autocomplete
              label="保險公司"
              clearable
              chips
              dense
              solo
              :items="proCompany"
              v-model="params.company"
            />
            <v-autocomplete
              label="保險屬性"
              clearable
              chips
              dense
              solo
              :items="proBigItem"
              v-model="params.bigItem"
            />
            <v-autocomplete
              label="主附約"
              clearable
              chips
              dense
              solo
              :items="proKind"
              v-model="params.kind"
            />
            <v-autocomplete
              label="保險種類"
              clearable
              chips
              dense
              solo
              :items="proSmallItem"
              v-model="params.smallItem"
            />
            <v-autocomplete
              label="保障內容"
              clearable
              chips
              dense
              solo
              :items="proContent"
              v-model="params.content"
            />
          </v-card-text>
          <div class="text-center">
            <v-btn
              class="mb-6"
              color="primary"
              dark
              rounded
              large
              @click="filter()"
              >篩選</v-btn
            >
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-row justify="center">
          <v-col cols="12" sm="4" md="6">
            <v-btn color="primary lighten-1" tile block depressed>最新</v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="6">
            <v-btn color="primary lighten-1" tile outlined block depressed
              >最多用戶收藏</v-btn
            >
          </v-col>
        </v-row>
        <!-- 商品資料render -->
        <v-row justify="center" v-for="data in proData" :key="data.proNum">
          <v-col cols="12" md="12">
            <v-card elevation="3">
              <v-card-title>
                {{ data.proCompany }} |
                {{
                  data.proName.match(data.proCompany)
                    ? data.proName.slice(4)
                    : data.proName
                }}
              </v-card-title>
              <v-card-text>
                <v-chip color="red" label outlined>
                  {{
                    data.proBigItem
                      .split(",")
                      .map((item) => item)
                      .join("、")
                  }}
                </v-chip>
                <v-chip class="ml-3" color="success" label outlined>
                  {{ data.proKind }}
                </v-chip>
                <v-chip
                  class="ml-3"
                  color="blue"
                  label
                  outlined
                  v-if="data.proPeriod !== ''"
                >
                  {{ data.proPeriod }}
                </v-chip>
                <v-btn
                  text
                  :style="
                    screenWidth < 960 ? 'margin-top: 20px' : 'float: right'
                  "
                  @click="getDetail(data.proNum)"
                >
                  <span class="primary--text">
                    了解更多
                    <v-icon color="primary">mdi-arrow-right</v-icon>
                  </span>
                </v-btn>
              </v-card-text>

              <v-divider class="mt-2 ml-4" />

              <div class="mt-2 ml-2">
                <v-badge
                  :content="data.likeNumber === 0 ? '0' : data.likeNumber"
                  color="red"
                  offset-x="10"
                  offset-y="10"
                >
                  <v-btn
                    class="mb-2"
                    icon
                    @click="onLike(data.proNum, data.isLike)"
                  >
                    <v-icon color="red">{{
                      data.isLike ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon>
                  </v-btn>
                </v-badge>
                <v-btn class="mb-2" icon>
                  <v-icon color="success">mdi-share</v-icon>
                </v-btn>
                <v-btn
                  class="mb-2"
                  icon
                  @click="onCollect(data.proNum, data.isCollect)"
                >
                  <v-icon color="blue">{{
                    data.isCollect ? "mdi-bookmark" : "mdi-bookmark-outline"
                  }}</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center mt-5">
          <v-pagination
            v-model="page"
            :length="parseInt(total % 10 === 0 ? total / 10 : total / 10 + 1)"
            :total-visible="7"
            @input="changePage()"
          />
        </div>
      </v-col>
    </v-row>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import {
  proCompany,
  proBigItem,
  proKind,
  proSmallItem,
  proContent,
} from "@/assets/constant/product.js";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Product",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      memNum: parseInt(this.$cookies.get("user_session")),
      show: false,
      page: 1,

      proCompany,
      proBigItem,
      proKind,
      proSmallItem,
      proContent,
      params: {
        company: "",
        bigItem: "",
        kind: "",
        smallItem: "",
        content: "",
      },
      proData: [],
      total: 0,
    };
  },
  computed: {
    ...mapState({
      productInfo: (state) => state.product.productInfo,
    }),
  },
  methods: {
    filter() {
      this.getProducts(this.params, 0, 10);
    },
    getDetail(proNum) {
      this.$router.push({ name: "ProductDetail", params: { proNum: proNum } });
    },
    changePage() {
      this.getProducts(this.params, this.page * 10 - 10, this.page * 10);
    },
    // 商品按讚相關
    async onLike(proNum, isLike) {
      if (isLike) {
        try {
          const res = await this.$api.product.cancelLikeProduct(
            proNum,
            this.memNum
          );
          if (res.message === "成功取消商品按讚") {
            this.proData.map((item) => {
              if (item.proNum === proNum) {
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
          const res = await this.$api.product.likeProduct(proNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功為商品按讚") {
            this.proData.map((item) => {
              if (item.proNum === proNum) {
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
    async checkLikeProduct(product) {
      try {
        const res = await this.$api.product.checkLikeProduct(
          product.proNum,
          this.memNum
        );
        if (res.message === "已按讚") {
          product.isLike = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 商品收藏相關
    async onCollect(proNum, isCollect) {
      if (isCollect) {
        try {
          const res = await this.$api.collection.cancelCollectProduct(
            proNum,
            this.memNum
          );
          if (res.message === "成功取消商品收藏") {
            this.productInfo.map((item) => {
              if (item.proNum === proNum) {
                item.isCollect = false;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await this.$api.collection.collectProduct(proNum, {
            memNum: this.memNum,
          });
          if (res.message === "成功收藏了商品") {
            this.productInfo.map((item) => {
              if (item.proNum === proNum) {
                item.isCollect = true;
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async checkCollectProduct(product) {
      const res = await this.getCollectProduct(this.memNum);
      res.map((item) => {
        if (item.proNum === product.proNum) product.isCollect = true;
      });
    },
    async getProducts(params, from, limit) {
      try {
        await this.getProductInfo(params);
        this.total = this.productInfo.length;
        this.proData = this.productInfo.slice(from, limit);
        this.productInfo.map((item) => {
          this.checkLikeProduct(item);
          this.checkCollectProduct(item);
        });
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions({
      getProductInfo: "product/getProductInfo",
      getCollectProduct: "collection/getCollectProduct",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
    }),
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  mounted() {
    this.getProducts(this.params, 0, 10);
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
