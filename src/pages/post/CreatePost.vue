<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto mt-6" max-width="80%" elevation="3">
      <v-card-title>新增貼文</v-card-title>
      <v-divider class="ml-4" />
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <span>abcxxxxx</span>
        <v-row class="mx-1 mt-4">
          <v-textarea
            label="請撰寫敘述......"
            outlined
            rows="10"
            no-resize
            v-model="text"
          />
        </v-row>
        <v-row align="center" justify="center" class="mb-4">
          <v-btn class="mr-10" color="grey" outlined @click="goBack()"
            >返回</v-btn
          >
          <v-btn color="blue darken-2" dark depressed>儲存</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "HomePage" });
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
