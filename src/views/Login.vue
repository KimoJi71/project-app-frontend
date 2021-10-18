<template>
  <v-container class="fill-height" fluid>
    <v-card color="orange lighten-1" width="400" height="700">
      <v-row align="center" justify="center">
        <v-col class="mt-15" cols="auto">
          <v-img src="../../public/專題LOGO-v.png" width="250" height="250" />
        </v-col>
      </v-row>
    </v-card>
    <v-card color="orange lighten-5" height="700">
      <v-row class="ma-8">
        <v-card>
          <v-card-text>
            <v-row class="mt-8" align="center" justify="center" no-gutters>
              <v-col cols="12">
                <p class="text-h6 text-center">感謝您使用我們的網站</p>
              </v-col>
              <v-col cols="12">
                <p class="text-h6 text-center">登入使用更多功能</p>
              </v-col>
            </v-row>
            <v-row class="mt-6" align="center" justify="center" no-gutters>
              <v-form>
                <v-col>
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    label="帳號"
                    filled
                    rounded
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    label="密碼"
                    filled
                    rounded
                  />
                </v-col>
              </v-form>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card>
  </v-container>
</template>
