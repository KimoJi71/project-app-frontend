<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-card-text>
        <v-list-item-avatar>
          <v-img
            src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
          />
        </v-list-item-avatar>
        <span>abcxxxxx · 5小時前</span>
        <div class="black--text mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </div>
        <v-divider class="mt-4" />
        <v-row class="mt-2">
          <v-col md="8">
            <v-icon color="red">mdi-heart-outline</v-icon>
            <v-icon class="ml-2" color="warning">mdi-alert</v-icon>
            <v-icon class="ml-2" color="success">mdi-share</v-icon>
            <v-icon class="ml-2" color="blue">mdi-bookmark-outline</v-icon>
          </v-col>
          <v-col md="4">
            <span style="float: right">共 0 則留言</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
