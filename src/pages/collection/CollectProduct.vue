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
        <span class="text-h5 grey--text">您還沒有收藏任何保險商品喔！</span>
      </v-row>
    </div>

    <!-- 有資料時render -->
    <v-card class="mx-auto my-6" max-width="80%" elevation="3" v-else>
      <v-card-title> 南山人壽 ｜ 新活力康祥定期健康保險(NTDD) </v-card-title>
      <v-card-text>
        <v-chip color="red" label outlined> 壽險保障商品、醫療保障商品 </v-chip>
        <v-chip class="ml-3" color="success" label outlined> 主約 </v-chip>
        <v-chip class="ml-3" color="blue" label outlined> 定期 </v-chip>
        <v-btn
          text
          :style="screenWidth < 960 ? 'margin-top: 20px' : 'float: right'"
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
          <v-icon color="blue">mdi-bookmark</v-icon>
        </v-btn>
      </div>
    </v-card>

    <BackBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "CollectProduct",
  components: {
    Header,
    CollectBtn,
    BackBtn,
  },
  data() {
    return {
      isData: true,
      screenWidth: document.body.clientWidth,
    };
  },
  methods: {
    getDetail() {
      this.$router.push({ name: "ProductDetail", params: { id: 1 } });
    },
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
