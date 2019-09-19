const headConf = require('./config/head')
const localesConf = require('./config/locales')
const markdownConf = require('./config/markdown')
const pluginsConf = require('./config/plugin')
const themeConf = require('./config/theme')
const slidebarConf = require('./config/sidebar')


module.exports = {
    title: "all_nan", //标题
    description: "all_nan's blog", //描述

    host: "0.0.0.0", //访问路径
    port: "4960", //端口

    base:"/vuepress-docs/",

    head: headConf,
    locales: localesConf,
    markdown: markdownConf,
    plugins:pluginsConf,
    themeConfig: themeConf,
    
}