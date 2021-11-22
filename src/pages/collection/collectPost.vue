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
        <span class="text-h5 grey--text">您還沒有收藏任何文章喔！</span>
      </v-row>
    </div>

    <!-- 有資料時render -->
    <v-card class="mx-auto my-6" max-width="80%" elevation="3" v-else>
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <span>abcxxxxx · 5小時前</span>
        <div class="black--text mt-2">
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </span>
          <router-link class="text-decoration-underline" to="/posts/detail/1"
            >...READ MORE</router-link
          >
        </div>
        <v-divider class="mt-4" />
        <div class="mt-3">
          <v-btn icon>
            <v-icon color="red">mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="warning">mdi-alert</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="success">mdi-share</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="blue">mdi-bookmark</v-icon>
          </v-btn>
          <span class="mt-2" style="float: right">共 2 則留言</span>
        </div>
      </v-card-text>
    </v-card>
    <BackBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "CollectPost",
  components: {
    Header,
    CollectBtn,
    BackBtn,
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
