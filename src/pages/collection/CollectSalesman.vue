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
      <v-col
        cols="12"
        md="3"
        v-for="salesman in salesmanData"
        :key="salesman.name"
      >
        <v-card elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6">{{ salesman.name }}</span>
          </v-row>

          <v-divider class="mt-4 mb-2" />
          <v-card-text class="text-h6 grey--text">
            <v-row align="center" justify="center">
              {{ salesman.company }}
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <BackBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "CollectSalesman",
  components: {
    Header,
    CollectBtn,
    BackBtn,
  },
  data() {
    return {
      isData: false,
      salesmanData: [
        { name: "abcdefgh", company: "永達保經" },
        { name: "lalalalala", company: "遠見保經" },
        { name: "fannyisfish", company: "富邦人壽" },
        { name: "poopoo_qqq", company: "南山人壽" },
        { name: "ooollooo", company: "國泰人壽" },
        { name: "kimoji71", company: "全球人壽" },
        { name: "matcha_0402", company: "遠雄人壽" },
      ],
    };
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
