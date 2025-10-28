const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "네코쿠모 견적",
    themeColor: "#ff55b3",
    msTileColor: "#ff55b3",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      display: "fullscreen",
      orientation: "landscape",
      background_color: "#ff55b3",
    },
  },
});
