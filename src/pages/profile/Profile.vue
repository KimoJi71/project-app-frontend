<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <!-- 側邊欄介紹 -->
    <v-row class="mt-4" justify="center">
      <v-col cols="12" md="2">
        <v-btn icon large v-if="screenWidth < 960" @click="show = !show">
          <v-icon large>mdi-dots-grid</v-icon>
        </v-btn>
        <v-card v-if="screenWidth > 960 || show">
          <v-list>
            <v-list-item>
              <v-list-item-avatar class="mx-auto" color="grey" size="85">
                <v-icon dark x-large>mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="pa-0 ma-0">
                <div align="center" justify="center">
                  <p class="text-h6">abcdefghijk</p>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row align="center" justify="center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="black"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="updateProfile()"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>編輯個人資料</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="ml-3"
                        color="black"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="goCollection()"
                      >
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>
                    </template>
                    <span>我的收藏</span>
                  </v-tooltip>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list dense>
            <v-list-item two-line v-for="item in profileInfo" :key="item.title">
              <v-btn outlined icon :color="item.color">
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
              <v-list-item-content class="ml-4">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list>
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-row align="center" justify="center">
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
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- 個人簡介 -->
      <v-col class="mt-3" cols="12" md="9">
        <v-row justify="center">
          <v-card width="90%">
            <v-card-text class="black--text"
              >大家好，我是abcdefghijk，希望能成為您的理財顧問</v-card-text
            >
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-divider class="my-6 mx-11" />
        </v-row>
        <!-- 文章 -->
        <v-row justify="center">
          <v-card class="mb-6" max-width="90%" elevation="3">
            <v-card-text>
              <v-list-item-avatar color="grey">
                <v-icon dark>mdi-account</v-icon>
              </v-list-item-avatar>
              <span>abcxxxxx · 5小時前</span>
              <v-menu offset-x rounded="lg">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="grey"
                    icon
                    right
                    absolute
                    v-bind="attrs"
                    v-on="on"
                  >
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </span>
                <router-link
                  class="text-decoration-underline"
                  to="/posts/detail/1"
                  >...READ MORE</router-link
                >
              </div>
              <v-divider class="mt-4" />
              <div class="mt-2">
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
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Profile",
  components: {
    Header,
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      show: false,
      profileInfo: [
        {
          icon: "mdi-domain",
          color: "red",
          title: "所屬公司",
          content: "永達保經",
        },
        {
          icon: "mdi-check",
          color: "blur-grey",
          title: "提供服務",
          content: "壽險 / 產險",
        },
        {
          icon: "mdi-phone",
          color: "blue",
          title: "電話",
          content: "0912000111",
        },
        {
          icon: "fab fa-line",
          color: "green",
          title: "Line ID",
          content: "0912000111",
        },
      ],
      menuItems: [
        { title: "編輯", action: () => this.updatePost() },
        { title: "刪除", action: () => this.deletePost() },
      ],
    };
  },
  methods: {
    updatePost() {
      this.$router.push({ name: "UpdatePost" });
    },
    deletePost() {
      //
    },
    updateProfile() {
      this.$router.push({ name: "UpdateProfile" });
    },
    goCollection() {
      this.$router.push({ name: "CollectPost" });
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
