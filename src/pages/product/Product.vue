/* eslint-disable prettier/prettier */
<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-row class="mt-4" justify="center">
      <v-col cols="12" md="2">
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
            <v-select
              label="保險公司"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
            <v-select
              label="保險屬性"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
            <v-select
              label="主附約"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
            <v-select
              label="保險種類"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
            <v-select
              label="保險特色"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
            <v-select
              label="保障內容"
              clearable
              chips
              dense
              solo
              :items="[1, 2, 3]"
            />
          </v-card-text>
          <div class="text-center">
            <v-btn class="mb-6" color="primary" dark rounded large>篩選</v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
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
        <v-row justify="center" v-for="data in tableData" :key="data.proNum">
          <v-col cols="12" md="12">
            <v-card elevation="3">
              <v-card-title>
                {{ data.proCompany }} |
                {{
                  data.proName.match(`${data.proCompany}`)
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
                  @click="getDetail()"
                >
                  <span class="primary--text">
                    了解更多
                    <v-icon color="primary">mdi-arrow-right</v-icon>
                  </span>
                </v-btn>
              </v-card-text>

              <v-divider class="mt-2 ml-4" />

              <div class="mt-2 ml-2">
                <v-btn class="mb-2" icon>
                  <v-icon color="red">mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn class="mb-2" icon>
                  <v-icon color="success">mdi-share</v-icon>
                </v-btn>
                <v-btn class="mb-2" icon>
                  <v-icon color="blue">mdi-bookmark-outline</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
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
      show: false,

      tableData: {},
    };
  },
  computed: {
    ...mapState({
      productInfo: (state) => state.product.productInfo,
    }),
  },
  methods: {
    getDetail() {
      this.$router.push({ name: "ProductDetail", params: { id: 1 } });
    },
    ...mapActions({
      getProductInfo: "product/getProductInfo",
    }),
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
    }),
  },
  async mounted() {
    try {
      await this.getProductInfo();
      this.tableData = this.productInfo;
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
