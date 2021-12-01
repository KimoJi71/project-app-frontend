<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <SearchResBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";

export default {
  name: "SearchPost",
  components: {
    Header,
    SearchResBtn,
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
