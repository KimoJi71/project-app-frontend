<template>
  <div>
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
          @click="goBack()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>回上一頁</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "BackBtn",
  methods: {
    goBack() {
      this.$router.back(-1);
    },
  },
};
</script>
