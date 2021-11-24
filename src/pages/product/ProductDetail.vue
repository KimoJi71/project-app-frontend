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
        <v-chip color="red" label outlined v-if="tableData.proBigItem">
          {{
            tableData.proBigItem
              .split(",")
              .map((item) => item)
              .join("、")
          }}
        </v-chip>
        <v-chip class="ml-3" color="success" label outlined>
          {{ tableData.proKind }}
        </v-chip>
        <v-chip
          class="ml-3"
          color="blue"
          label
          outlined
          v-if="tableData.proPeriod"
        >
          {{ tableData.proPeriod }}
        </v-chip>

        <v-list>
          <v-list-item class="pa-0 mt-4" v-if="tableData.proSmallItem">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                商品種類
              </v-list-item-title>
              <span class="mt-3 pl-9">{{
                tableData.proSmallItem
                  .split(",")
                  .map((item) => item)
                  .join(" / ")
              }}</span>
            </v-list-item-content>
          </v-list-item>

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
                <v-tooltip bottom>
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
                      class="ml-5"
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

    <BackBtn />
    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import BackBtn from "@/components/BackBtn.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ProductDetail",
  components: {
    Header,
    Loading,
    BackBtn,
  },
  data() {
    return {
      proNum: parseInt(this.$route.params.proNum),
      tableData: {
        proNum: null,
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
      },
    };
  },
  computed: {
    ...mapState({
      productInfo: (state) => state.product.productInfo,
    }),
  },
  methods: {
    goBack() {
      this.$router.back(-1);
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
      await this.getProductInfo("");
      const data = this.productInfo.filter((item) => {
        return item.proNum === this.proNum;
      });
      this.tableData = data[0];
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
