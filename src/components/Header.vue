<template>
  <div>
    <v-app-bar fixed color="primary lighten-1" evalate-on-scroll>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-img src="../../public/專題LOGO.png" width="200" height="35" />
      </v-toolbar-title>
      <v-spacer /><v-spacer /><v-spacer />
      <v-text-field
        placeholder="輸入你想搜尋的關鍵字"
        append-icon="mdi-magnify"
        class="mt-6 ml-9"
        dense
        solo
        rounded
        v-model="keywords"
        @click:append="search()"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      left
      fixed
      temporary
      overlay-opacity="0.3"
    >
      <v-list-item v-if="memNum" link :to="`/profile/${memNum}`">
        <v-list-item-avatar color="grey">
          <v-icon v-if="memPhoto === null" dark>mdi-account</v-icon>
          <v-img
            v-else
            cover
            :src="'http://localhost:3000/images\\' + memPhoto"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ memName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.name"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item v-if="memNum" link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else link @click="login()">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登入</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      memNum: parseInt(this.$cookies.get("user_permission")),
      drawer: false,
      items: [
        { name: "貼文", icon: "mdi-note", href: "/posts" },
        { name: "保險商品", icon: "mdi-view-dashboard", href: "/products" },
        { name: "排行榜", icon: "mdi-star", href: "/rank" },
        { name: "幫助中心", icon: "mdi-lightbulb", href: "/helpCenter" },
      ],
      memName: "",
      memPhoto: null,
      keywords: "",
    };
  },
  computed: {
    ...mapState({
      profile: (state) => state.member.profile,
    }),
  },
  methods: {
    search() {
      localStorage.setItem("keywords", this.keywords);
      this.$router.push({ name: "SearchPost" }).catch(() => {});
      if (this.$route.path === "/search/post") window.location.reload();
    },
    logout() {
      this.$router.push({ name: "Login" });
      this.$cookies.remove("user_permission");
    },
    login() {
      this.$router.push({ name: "Login" }).then(() => {
        window.location.reload();
      });
    },
    ...mapActions({
      getProfile: "member/getProfile",
    }),
  },
  watch: {
    async drawer() {
      if (this.memNum) {
        try {
          await this.getProfile(this.memNum);
          this.memName = this.profile.data.memName;
          this.memPhoto = this.profile.data.memPhoto;
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
