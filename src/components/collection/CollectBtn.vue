<template>
  <div class="mt-6 ml-6">
    <v-btn
      color="primary lighten-1"
      depressed
      large
      tile
      @click="goCollectPost()"
    >
      文章
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      outlined
      tile
      @click="goCollectPost()"
    >
      保險商品
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      outlined
      tile
      @click="goCollectPost()"
    >
      業務員
    </v-btn>
    <v-divider class="mt-6" />
  </div>
</template>

<script>
export default {
  methods: {
    goCollectPost() {
      if (!this.$route.path) this.$router.push({ name: "CollectPost" });
    },
  },
};
</script>
