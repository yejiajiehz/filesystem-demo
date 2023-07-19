const { defineConfig } = require("@vue/cli-service");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // remove the existing ForkTsCheckerWebpackPlugin
    config.plugins = config.plugins.filter(
      (p) => !(p instanceof ForkTsCheckerWebpackPlugin)
    );
  },
});
