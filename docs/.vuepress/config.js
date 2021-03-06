const headConf = require("./config/head");
const localesConf = require("./config/locales");
const markdownConf = require("./config/markdown");
const pluginsConf = require("./config/plugin");
const themeConf = require("./config/theme");
const sidebarConf = require("./config/sidebar");

module.exports = {
  title: "all_nan", //标题
  description: "Little birds can remember", //描述

  // host: "0.0.0.0", //访问路径
  port: "10800", //端口

  // base:"/notes",

  head: headConf,
  locales: localesConf,
  markdown: markdownConf,
  plugins: pluginsConf,
  theme: 'reco',
  themeConfig: themeConf,
};
