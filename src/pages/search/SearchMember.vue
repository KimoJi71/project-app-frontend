<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <SearchResBtn />
    <!-- 無資料時render -->
    <div v-if="isData">
      <v-row class="mt-15" align="center" justify="center">
        <v-icon color="grey" size="100">mdi-emoticon-sad-outline</v-icon>
      </v-row>
      <v-row class="mt-10" align="center" justify="center">
        <span class="text-h5 grey--text">抱歉...沒有符合的搜尋結果</span>
      </v-row>
    </div>

    <!-- 有資料時render -->
    <v-row class="mt-6 mx-6" align="center" justify="start" v-else>
      <v-col cols="12" md="3" v-for="member in members" :key="member.memNum">
        <v-card class="mb-3" elevation="3">
          <v-row align="center" justify="center">
            <v-avatar class="my-3" color="grey" size="60">
              <v-icon v-if="member.memPhoto === null" dark large
                >mdi-account</v-icon
              >
              <v-img
                v-else
                contain
                :src="'http://localhost:3000/images\\' + member.memPhoto"
              />
            </v-avatar>
          </v-row>
          <v-row align="center" justify="center">
            <router-link
              class="indigo--text text-h6 mb-3"
              :to="`/profile/${member.memNum}`"
              >{{ member.memName }}</router-link
            >
          </v-row>
          <v-row
            align="center"
            justify="center"
            v-if="member.memIdentify === 0"
          >
            <v-chip class="mb-3" color="grey" outlined>保戶</v-chip>
          </v-row>
          <v-row
            align="center"
            justify="center"
            v-if="member.memIdentify === 1"
          >
            <v-chip class="mb-3" color="grey" outlined>業務員</v-chip>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <Loading />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchResBtn from "@/components/search/SearchResBtn.vue";
import Loading from "@/components/Loading.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchMember",
  components: {
    Header,
    SearchResBtn,
    Loading,
  },
  data() {
    return {
      isData: false,
      memNum: parseInt(this.$cookies.get("user_session")),
      membersData: [],
    };
  },
  computed: {
    ...mapState({
      members: (state) => state.search.members,
    }),
  },
  methods: {
    ...mapActions({
      getSearchMember: "search/getSearchMember",
    }),
  },
  async mounted() {
    const keywords = localStorage.getItem("keywords");
    try {
      await this.getSearchMember(keywords);
      this.membersData = this.members;
      if (this.membersData.length === 0) this.isData = true;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
