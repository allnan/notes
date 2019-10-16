module.exports = {
    // '@vuepress/register-components': {
    //     componentsDir: './components'
    // },
    '@vuepress/active-header-links':true,
    'vuepress-plugin-smooth-scroll':true,
    '@vuepress/nprogress':true,
    '@vuepress/medium-zoom': true,
    'vuepress-plugin-element-tabs':true,
    'vuepress-plugin-container':{

    },

    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
            // 自定义弹窗
            // popupComponent: 'MySWUpdatePopup',
        }
    },


}
