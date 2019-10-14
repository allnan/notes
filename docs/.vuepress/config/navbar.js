module.exports = [
  { text: "主页", link: "/", icon: "reco-home" },
  {
    text: "Dart",
    items: [
      {
        text: "参考",
        items: [
          { text: "Dart官网", link: "https://dart.dev/" },
          {
            text: "Dart官网Tour",
            link: "https://dart.dev/guides/language/language-tour"
          },
          { text: "三方翻译", link: "https://github.com/konieshadow/dart-tour" }
        ]
      },
      {
        text: "学习",
        items: [
          { text: "Dart official tour", link: "/dart/official_tour_translate/" }
        ]
      }
    ],
    icon: "reco-api"
  },
  { text: "时间轴", link: "/timeLine/", icon: "reco-date" },
  { text: "关于", items: [
    { text: "repo", link: "https://github.com/allnan/notes",icon: 'reco-document' },
    { text: "Github", link: "https://github.com/allnan",icon: 'reco-github' },
  ] ,icon: "reco-account",}
];
