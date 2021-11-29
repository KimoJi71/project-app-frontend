<template>
  <v-app>
    <v-main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.path" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
