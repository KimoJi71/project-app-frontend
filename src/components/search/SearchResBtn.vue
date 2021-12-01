<template>
  <div class="mt-6 ml-6">
    <p class="text-h5">搜尋結果</p>
    <v-spacer />
    <v-btn
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/search/post'"
      tile
      @click="$router.push({ name: 'SearchPost' })"
    >
      文章
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/search/product'"
      tile
      @click="$router.push({ name: 'SearchProduct' })"
    >
      保險商品
    </v-btn>
    <v-btn
      class="ml-4"
      color="primary lighten-1"
      large
      depressed
      :outlined="$route.path !== '/search/member'"
      tile
      @click="$router.push({ name: 'SearchMember' })"
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
