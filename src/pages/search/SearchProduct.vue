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
      v-for="product in productsData"
      :key="product.proNum"
    >
      <v-card-title>
        {{ product.proCompany }} |
        {{
          product.proName.match(product.proCompany)
            ? product.proName.slice(4)
            : product.proName
        }}
      </v-card-title>
      <v-card-text>
        <v-chip color="red" label outlined>
          {{
            product.proBigItem
              .split(",")
              .map((item) => item)
              .join("、")
          }}
        </v-chip>
        <v-chip class="ml-3" color="success" label outlined>
          {{ product.proKind }}
        </v-chip>
        <v-chip
          class="ml-3"
          color="blue"
          label
          outlined
          v-if="product.proPeriod !== ''"
        >
          {{ product.proPeriod }}
        </v-chip>
        <v-btn
          text
          :style="screenWidth < 960 ? 'margin-top: 20px' : 'float: right'"
          @click="getDetail(product.proNum)"
        >
          <span class="primary--text">
            了解更多
            <v-icon color="primary">mdi-arrow-right</v-icon>
          </span>
        </v-btn>
      </v-card-text>

      <v-divider class="mt-2 ml-4" />

      <div class="mt-3 ml-4">
        <v-badge
          :content="product.likeNumber === 0 ? '0' : product.likeNumber"
          color="red"
          offset-x="10"
          offset-y="10"
        >
          <v-btn
            class="mb-2"
            icon
            @click="onLike(product.proNum, product.isLike)"
          >
            <v-icon color="red">{{
              product.isLike ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </v-btn>
        </v-badge>
        <v-btn class="mb-2" icon>
          <v-icon color="success">mdi-share</v-icon>
        </v-btn>
        <v-btn
          class="mb-2"
          icon
          @click="onCollect(product.proNum, product.isCollect)"
        >
          <v-icon color="blue">{{
            product.isCollect ? "mdi-bookmark" : "mdi-bookmark-outline"
          }}</v-icon>
        </v-btn>
      </div>
    </v-card>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";
import Loading from "@/components/Loading.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchProduct",
  components: {
    Header,
    SearchResBtn,
    Loading,
  },
  data() {
    return {
      isData: false,
      screenWidth: document.body.clientWidth,
      memNum: parseInt(this.$cookies.get("user_session")),
      productsData: [],
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.search.products,
    }),
  },
  methods: {
    getDetail(proNum) {
      this.$router.push({ name: "ProductDetail", params: { proNum: proNum } });
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
            this.productsData.map((item) => {
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
            this.productsData.map((item) => {
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
            this.productsData.map((item) => {
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
            this.productsData.map((item) => {
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
    ...mapActions({
      getSearchProduct: "search/getSearchProduct",
      getCollectProduct: "collection/getCollectProduct",
    }),
  },
  async mounted() {
    const keywords = localStorage.getItem("keywords");
    try {
      await this.getSearchProduct(keywords);
      this.productsData = this.products;
      if (this.productsData.length === 0) this.isData = true;
      else {
        this.productsData.map((item) => {
          this.checkLikeProduct(item);
          this.checkCollectProduct(item);
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
