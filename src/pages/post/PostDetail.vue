<template>
  <div id="bkg">
    <Header />
    <br /><br /><br />
    <v-card class="mx-auto my-6" max-width="80%" elevation="3">
      <v-card-text>
        <v-row>
          <v-col>
            <v-list-item-avatar>
              <v-img
                src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
              />
            </v-list-item-avatar>
            <span>abcxxxxx · 5小時前</span>
            <div class="black--text mt-2">
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a type
                and scrambled it to make a type specimen book
              </span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-4" />

        <div class="mt-4">
          <v-icon color="red">mdi-heart-outline</v-icon>
          <v-icon class="ml-2" color="warning">mdi-alert</v-icon>
          <v-icon class="ml-2" color="success">mdi-share</v-icon>
          <v-icon class="ml-2" color="blue">mdi-bookmark-outline</v-icon>
          <span style="float: right">共 2 則留言</span>
        </div>

        <v-divider class="mt-4" />

        <v-row class="mt-4">
          <v-col cols="12" md="1">
            <v-list-item-avatar>
              <v-img
                src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
              />
            </v-list-item-avatar>
          </v-col>
          <v-col cols="12" md="11">
            <v-textarea
              label="回應......"
              class="mr-4"
              append-icon="mdi-send"
              no-resize
              rows="2"
              outlined
            />
          </v-col>
        </v-row>

        <v-divider class="mb-2" />

        <v-row>
          <v-col>
            <v-list-item-avatar>
              <v-img
                src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
              />
            </v-list-item-avatar>
            <span>qazxxxxxxxxx · 3小時前</span>
            <div class="black--text mt-2 mb-4 ml-14">
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="mb-2" />

        <v-row>
          <v-col>
            <v-list-item-avatar>
              <v-img
                src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
              />
            </v-list-item-avatar>
            <span>qazxxxxxxxxx · 3小時前</span>
            <div class="black--text mt-2 mb-4 ml-14">
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>

<style>
#bkg {
  background-color: #fdf7ef;
  height: 100%;
}
</style>
