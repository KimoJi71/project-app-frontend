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
    <v-card v-else class="mx-auto my-6" max-width="80%" elevation="3">
      <v-card-title> 南山人壽 | XXX </v-card-title>
      <v-card-text>
        <v-chip color="red" label outlined> 壽險 </v-chip>
        <v-chip class="ml-3" color="success" label outlined> 主約 </v-chip>
        <v-chip class="ml-3" color="blue" label outlined> 終身 </v-chip>
        <v-btn
          text
          :style="screenWidth < 960 ? 'margin-top: 20px' : 'float: right'"
        >
          <span class="primary--text">
            了解更多
            <v-icon color="primary">mdi-arrow-right</v-icon>
          </span>
        </v-btn>
      </v-card-text>

      <v-divider class="mt-2 ml-4" />

      <div class="mt-3 ml-4">
        <v-badge content="0" color="red" offset-x="10" offset-y="10">
          <v-btn class="mb-2" icon>
            <v-icon color="red">mdi-heart-outline</v-icon>
          </v-btn>
        </v-badge>
        <v-btn class="mb-2" icon>
          <v-icon color="success">mdi-share</v-icon>
        </v-btn>
        <v-btn class="mb-2" icon>
          <v-icon color="blue">mdi-bookmark-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";

export default {
  name: "SearchProduct",
  components: {
    Header,
    SearchResBtn,
  },
  data() {
    return {
      isData: false,
      screenWidth: document.body.clientWidth,
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
