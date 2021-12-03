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
    <v-row class="mt-6 mx-6" align="center" justify="start" v-else>
      <v-col cols="12" md="3">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6 mb-3">野原新之助</span>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6 mb-3">野原廣志</span>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6 mb-3">櫻田妮妮</span>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6 mb-3">風間徹</span>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon dark large>mdi-account</v-icon>
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <span class="text-h6 mb-3">小白</span>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";

export default {
  name: "SearchMember",
  components: {
    Header,
    SearchResBtn,
  },
  data() {
    return {
      isData: false,
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
