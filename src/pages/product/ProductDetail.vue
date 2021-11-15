<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="70%" elevation="3">
      <v-card-title>南山人壽 ｜ 新活力康祥定期健康保險(NTDD)</v-card-title>
      <v-card-text>
        <v-chip color="red" label outlined> 壽險保障商品、醫療保障商品 </v-chip>
        <v-chip class="ml-3" color="success" label outlined> 主約 </v-chip>
        <v-chip class="ml-3" color="blue" label outlined> 定期 </v-chip>

        <v-list>
          <v-list-item class="pa-0 mt-4">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                商品種類
              </v-list-item-title>
              <span class="mt-3 pl-9"
                >定期壽險-台幣 / 重大疾病與重大傷病 / 癌症醫療</span
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                商品特色
              </v-list-item-title>
              <div class="mt-3 pl-9">
                <ul>
                  <li>投保年齡：15足歲~40歲</li>
                  <li class="mt-3">7項重大疾病，輕/重度均有保障</li>
                  <li class="mt-3">加強人生黃金期的階段性保障</li>
                </ul>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-icon class="mr-2" color="black">mdi-label</v-icon>
                保障內容
              </v-list-item-title>
              <span class="mt-3 pl-9">
                身故給付 / 完全失能給付 / 重大疾病 / 豁免保費
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
                      href="https://www.nanshanlife.com.tw/NanshanWeb/file/DOCUMENT/7341"
                      target="_blank"
                    >
                      <v-icon>mdi-clipboard-minus</v-icon>
                    </v-btn>
                  </template>
                  <span>DM</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-3"
                      color="green"
                      fab
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      href="https://www.nanshanlife.com.tw/NanshanWeb/file/DOCUMENT/7361"
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

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-1"
          dark
          fixed
          right
          bottom
          fab
          v-bind="attrs"
          v-on="on"
          @click="goBack()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>回上一頁</span>
    </v-tooltip>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back(-1);
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
