const sidebar = require("./sidebar");

module.exports = {
  repo: "allnan/vue-press-doc",
  navbar: true,
  editLinks: false,
  editLinkText: "在 GitHub 上编辑此页",
  lastUpdated: "更新于",
  sidebar,
  nav: [
    { text: "home", link: "/" },
    { text: "dart", link: "/dart/" },
    { text: "flutter", link: "/flutter/" },
    { text: "java", link: "/java/" },
    { text: "android", link: "/android/" },
  ]
};
