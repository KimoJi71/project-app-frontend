<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />

    <div class="mt-6 ml-6">
      <p class="text-h5">常見問題</p>
      <v-divider class="mt-6" />
    </div>

    <v-row class="mt-6 mx-10" align="center" justify="center">
      <v-card width="90%" elevation="0">
        <v-expansion-panels multiple focusable accordion>
          <v-expansion-panel v-for="(FAQ, idx) in FAQData" :key="FAQ.serNum">
            <v-expansion-panel-header class="font-weight-bold body-1">
              <v-row align="center">
                <v-col class="d-flex" cols="12" md="auto">
                  <v-chip color="#CD853F" dark>Q{{ idx + 1 }}</v-chip>
                </v-col>
                <v-col cols="12" md="auto">
                  <span>{{ FAQ.question }}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-6 mb-2">
              {{ FAQ.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-row>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "FAQ",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      FAQData: [],
    };
  },
  async mounted() {
    try {
      const res = await this.$api.FAQ.getFAQ();
      this.FAQData = res;
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
