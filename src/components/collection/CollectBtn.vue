<template>
  <div class="mt-6 ml-6">
    <p class="text-h5">我的收藏</p>
    <v-spacer />
    <v-btn
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/collections/post'"
      tile
      @click="$router.push({ name: 'CollectPost' })"
    >
      文章
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/collections/product'"
      tile
      @click="$router.push({ name: 'CollectProduct' })"
    >
      保險商品
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/collections/salesman'"
      tile
      @click="$router.push({ name: 'CollectSalesman' })"
    >
      業務員
    </v-btn>
    <v-divider class="mt-6" />

    <BackBtn />
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn.vue";

export default {
  name: "CollectBtn",
  components: {
    BackBtn,
  },
};
</script>
