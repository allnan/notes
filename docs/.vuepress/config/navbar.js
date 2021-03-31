module.exports = [
  { text: "主页", link: "/", icon: "reco-home" },
  {
    text: "目录",
    items: [
      {
        text: "Dart",
        items: [
          { text: "Dart language tour", link: "/dart/language_tour_translate/" }
        ]
      }
    ],
    icon: "reco-api"
  },
  // {
    // text: "markdown",
    // icon: "reco-blog",
    // link:"/markdown/"
  // },
  { text: "时间轴", link: "/timeLine/", icon: "reco-date" },
  {
    text: "关于",
    items: [
      {
        text: "repo",
        link: "https://github.com/allnan/notes",
        icon: "reco-document"
      },
      { text: "Github", link: "https://github.com/allnan", icon: "reco-github" }
    ],
    icon: "reco-account"
  }
];
