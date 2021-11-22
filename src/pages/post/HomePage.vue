<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-card-text>
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <span>abcxxxxx · 5小時前</span>
        <v-menu offset-x rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" icon right absolute v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, idx) in menuItems"
              :key="idx"
              @click="item.action"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
            <v-icon color="blue">mdi-bookmark-outline</v-icon>
          </v-btn>
          <span class="mt-2" style="float: right">共 2 則留言</span>
        </div>
      </v-card-text>
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
          @click="createPost()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>新增貼文</span>
    </v-tooltip>

    <Snackbar />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "HomePage",
  components: {
    Header,
    Snackbar,
  },
  data() {
    return {
      menuItems: [
        { title: "編輯", action: () => this.updatePost() },
        { title: "刪除", action: () => this.deletePost() },
      ],
    };
  },
  methods: {
    createPost() {
      this.$router.push({ name: "CreatePost" });
    },
    updatePost() {
      this.$router.push({ name: "UpdatePost" });
    },
    deletePost() {
      //
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
