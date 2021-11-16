<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <CollectBtn />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CollectBtn from "@/components/collection/CollectBtn.vue";

export default {
  components: {
    Header,
    CollectBtn,
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
