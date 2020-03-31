const sidebarConf = require("./sidebar");
const navbarConf = require("./navbar");

module.exports = {
  sidebar: sidebarConf,
  author: "all_nan",
  smoothScroll: true,
  navbar: true,
  nav: navbarConf,
  editLinks: false,
  lastUpdated: "更新于",

  /*reco theme config*/
  type: "blog",
  logo: "/avatar.jpg",
  authorAvatar:"/avatar.jpg",
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: "分类" // 默认文案 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: "标签" // 默认文案 “标签”
    }
  },
  // valine
  valineConfig: {
    appId: "orYT8TAmrrxvNRchXm5LSvXt-gzGzoHsz",
    appKey: "WcQh3BQeN6iusz8mT7ifMccv",
    placeholder: "你刚才说了JoJo对吧",
    avatar: ""
  }
};
