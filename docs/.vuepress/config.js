const headConf = require("./config/head");
const localesConf = require("./config/locales");
const markdownConf = require("./config/markdown");
const pluginsConf = require("./config/plugin");
const themeConf = require("./config/theme");
const slidebarConf = require("./config/sidebar");

module.exports = {
  title: "all_nan", //标题
  description: "all_nan's notes", //描述

  // host: "0.0.0.0", //访问路径
  port: "10800", //端口

  // base:"/",

  head: headConf,
  locales: localesConf,
  markdown: markdownConf,
  plugins: pluginsConf,
  themeConfig: themeConf
};
