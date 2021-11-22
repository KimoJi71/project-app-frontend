<template>
  <div>
    <v-app-bar fixed color="primary lighten-1" evalate-on-scroll>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-img src="../../public/專題LOGO.png" width="200" height="35" />
      </v-toolbar-title>
      <v-spacer /><v-spacer /><v-spacer />
      <v-text-field
        append-icon="mdi-magnify"
        class="mt-6 ml-9"
        dense
        solo
        rounded
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item link to="/profile/1">
        <v-list-item-avatar color="grey">
          <v-icon dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>KimoJi</v-list-item-title>
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
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: false,
      items: [
        { name: "首頁", icon: "mdi-home", href: "/posts" },
        { name: "保險商品", icon: "mdi-view-dashboard", href: "/products" },
        // { name: "排行榜", icon: "mdi-star", href: "/rank" },
        // { name: "幫助中心", icon: "mdi-lightbulb", href: "/help" },
      ],
    };
  },
};
</script>
