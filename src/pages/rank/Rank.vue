<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />

    <div class="mt-6 ml-6">
      <p class="ml-2 text-h5">業務員排名</p>
      <v-divider class="mt-6" />
    </div>

    <v-row class="mt-3 mx-3" align="center" justify="start">
      <v-col
        class="mb-3"
        cols="12"
        md="3"
        v-for="(member, idx) in membersData"
        :key="idx"
      >
        <v-card elevation="3">
          <v-card-title class="text-h5 font-weight-bold">
            Top {{ idx + 1 }}
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  color="blue-grey lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >{{ member.Number }}</v-chip
                >
              </template>
              <span>被收藏數</span>
            </v-tooltip>
          </v-card-title>
          <v-divider />
          <v-row align="center" justify="center">
            <v-avatar class="mt-6 mb-3" color="grey" size="70">
              <v-icon v-if="member.memPhoto === null" dark large
                >mdi-account</v-icon
              >
              <v-img
                v-else
                cover
                :src="'http://localhost:3000/images\\' + member.memPhoto"
              />
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <p class="text-h6 mb-4">{{ member.memName }}</p>
          </v-row>
          <v-row class="mx-4" align="center" justify="center">
            <router-link
              class="primary--text mb-4 hoverLink"
              style="border-bottom: 1px dotted; text-decoration: none"
              :to="`/profile/${member.salesmanNum}`"
            >
              查看個人檔案
            </router-link>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "Rank",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      membersData: [],
    };
  },
  async mounted() {
    try {
      const res = await this.$api.rank.salesmanRank();
      this.membersData = res;
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
.hoverLink {
  opacity: 0.5;
}
.hoverLink:hover {
  opacity: 1;
}
</style>
