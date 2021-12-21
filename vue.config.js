module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: "http://localhost:3000",
    // proxy: "http://192.168.50.100:3000",
  },
};
