const {
    mdConf,
    themeConf,
    localesConf,
} = require('./config/')

module.exports = {
    title: "all_nan", //标题
    description: "all_nan's blog", //描述
    host: "0.0.0.0", //访问路径
    port: "4500", //端口
    
    locales: localesConf,
    markdown: mdConf,
    themeConfig: themeConf,
    plugins: [
        '@vuepress/back-to-top'
    ]
}