/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0654c0cb9c843b0364bbf72adedbcd41"
  },
  {
    "url": "assets/css/0.styles.470173c2.css",
    "revision": "13dbc4cd91c8c45580174a5902fe5518"
  },
  {
    "url": "assets/img/2019-10-24-21-43-30.04f6bc80.png",
    "revision": "04f6bc80a22e6cab1e7de8e33b8da8d8"
  },
  {
    "url": "assets/img/2019-10-24-21-52-40.946eb6ce.png",
    "revision": "946eb6cece22c0db0c8da9e34c81eb87"
  },
  {
    "url": "assets/img/2019-10-24-22-07-05.a20611d2.png",
    "revision": "a20611d2df2afed1f2be089308dd16c9"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/dart.af0ad45a.svg",
    "revision": "af0ad45a3857f360ae5a56d805bfa8a8"
  },
  {
    "url": "assets/js/1.398640d1.js",
    "revision": "9e6524f98b3dab08e02680af9c0e9776"
  },
  {
    "url": "assets/js/10.dfccb63e.js",
    "revision": "637a1fcd2722e4102359a0614678248b"
  },
  {
    "url": "assets/js/11.1399e776.js",
    "revision": "6b5b944958b677942a51828f97eb07fd"
  },
  {
    "url": "assets/js/12.95b487cc.js",
    "revision": "710708026360372e671eccfad460fa44"
  },
  {
    "url": "assets/js/13.7669fe1f.js",
    "revision": "8b42db614ebf58d8d75c857bf770442a"
  },
  {
    "url": "assets/js/14.c830973b.js",
    "revision": "a5fc269076d54eea47ee0dbdf4479daf"
  },
  {
    "url": "assets/js/15.2c7727b3.js",
    "revision": "4711f5fc651bec2b5a72ee823d798fab"
  },
  {
    "url": "assets/js/16.12198350.js",
    "revision": "41eee063adc61821ede95897cdc168e9"
  },
  {
    "url": "assets/js/17.1bd8527d.js",
    "revision": "3a3e840d61439f78e757dbf5f4400b03"
  },
  {
    "url": "assets/js/18.1a033499.js",
    "revision": "9a971916761cc8c5ca02f9c825058c72"
  },
  {
    "url": "assets/js/19.20de86a0.js",
    "revision": "95da1defa13e1d6b7ce4ba4270118d23"
  },
  {
    "url": "assets/js/20.187eff2e.js",
    "revision": "9f3212e9f5a365ad60b93a63fe57fd0d"
  },
  {
    "url": "assets/js/21.74123684.js",
    "revision": "0d7d06d7f70bf7bc8335a5f57e3835fe"
  },
  {
    "url": "assets/js/22.cdb59a3a.js",
    "revision": "5e511ca9583f10b277be81227e70bb41"
  },
  {
    "url": "assets/js/23.d59601c5.js",
    "revision": "dc1308e6ae279d7092b59fba2b7b2ec2"
  },
  {
    "url": "assets/js/24.9070ea4f.js",
    "revision": "d04b37305db7f9b4b765f30d090250e4"
  },
  {
    "url": "assets/js/25.cea369bf.js",
    "revision": "ca22db0576a65eb6ea5c79adbbc57930"
  },
  {
    "url": "assets/js/26.38ae3200.js",
    "revision": "a26b8ea62510e0fbd5e5b0581de869df"
  },
  {
    "url": "assets/js/27.1df68b5b.js",
    "revision": "6d73904b5ee7880ecc0ae661b0d65f17"
  },
  {
    "url": "assets/js/28.d8bad9af.js",
    "revision": "824997c6e41b6989ddb662c8e2346e08"
  },
  {
    "url": "assets/js/29.616b4290.js",
    "revision": "63cb05a5670d6ff66c881c260fdd0885"
  },
  {
    "url": "assets/js/3.5bade293.js",
    "revision": "7cc8a793e6925dcb221989720fd71650"
  },
  {
    "url": "assets/js/30.b0310cc4.js",
    "revision": "fe1aee4082fda97c9ad866f0bff77b6f"
  },
  {
    "url": "assets/js/31.fb42a88e.js",
    "revision": "2bbc24f8abe42bd6495b0b3a2af04e4c"
  },
  {
    "url": "assets/js/32.36db2ff5.js",
    "revision": "5b67cc45e7d09f05ad1f91eff5142cec"
  },
  {
    "url": "assets/js/4.f6413fd3.js",
    "revision": "640691298b70f2c6362c979ac849b77c"
  },
  {
    "url": "assets/js/5.9f18b3d8.js",
    "revision": "b87115e460e71733f5079ae5ef8da20d"
  },
  {
    "url": "assets/js/6.c1a1d7aa.js",
    "revision": "b7d22930f80bbade3e9508af959c75dc"
  },
  {
    "url": "assets/js/7.34a2fe55.js",
    "revision": "05a5b32a97a88411ddb853c2dc79e222"
  },
  {
    "url": "assets/js/8.e6c549b8.js",
    "revision": "39c7225d300a5dee47609a63b2c5f344"
  },
  {
    "url": "assets/js/9.b92d820a.js",
    "revision": "1c501c911bd72062aa58e092698a47f9"
  },
  {
    "url": "assets/js/app.23e7d897.js",
    "revision": "d6f06d92e6a4c8f607995b08545055e1"
  },
  {
    "url": "avatar.jpg",
    "revision": "1a0317a7e4f103664e84233f85f0c40e"
  },
  {
    "url": "banner.gif",
    "revision": "54ae82d324db4cf1fff0fa1cf37f7e0e"
  },
  {
    "url": "categories/Dart/index.html",
    "revision": "04bf86685e39412af208abf7892146d1"
  },
  {
    "url": "categories/Dart/page/2/index.html",
    "revision": "669b9e1e128719332b147607b2f54c34"
  },
  {
    "url": "categories/index.html",
    "revision": "c8e97a9ed41eab16f39959d60b3b3120"
  },
  {
    "url": "dart/language_tour_translate/asynchrony.html",
    "revision": "5894688085ea2d7f3ec7c41c71ee6391"
  },
  {
    "url": "dart/language_tour_translate/build_in_types.html",
    "revision": "21e6342cf96004a3275e2523e92bcbcb"
  },
  {
    "url": "dart/language_tour_translate/callable_classes.html",
    "revision": "06d70682ebf466dbb043abbba898f16a"
  },
  {
    "url": "dart/language_tour_translate/classes.html",
    "revision": "24609cc8ec9efedb71d3d4c48fa848c8"
  },
  {
    "url": "dart/language_tour_translate/comments.html",
    "revision": "f67c690a03649caa66af1e0123e28645"
  },
  {
    "url": "dart/language_tour_translate/control_flow_statements.html",
    "revision": "fd323fbdf9c4be4627d8a532d21adb4c"
  },
  {
    "url": "dart/language_tour_translate/exceptions.html",
    "revision": "703a0354e4099f8bab87b7c3949b93c1"
  },
  {
    "url": "dart/language_tour_translate/functions.html",
    "revision": "46878e16c2741d2cb95f52982f18860a"
  },
  {
    "url": "dart/language_tour_translate/generators.html",
    "revision": "13cafc0813324f3d5e86f24fac0f2c8b"
  },
  {
    "url": "dart/language_tour_translate/generics.html",
    "revision": "4cdde3cf50e8782a0b09901bb78fbbbe"
  },
  {
    "url": "dart/language_tour_translate/hello_world.html",
    "revision": "1e23ea506d8f4582a76eb9df8fa3a868"
  },
  {
    "url": "dart/language_tour_translate/index.html",
    "revision": "bebb92ff13af0beba57b82657641a4d4"
  },
  {
    "url": "dart/language_tour_translate/isolate.html",
    "revision": "1ee74066da1c76d726081075329982a8"
  },
  {
    "url": "dart/language_tour_translate/libraries.html",
    "revision": "6f38328808e709f74f45f90c7b424afb"
  },
  {
    "url": "dart/language_tour_translate/metadata.html",
    "revision": "f6928efc744e0034449a4296415fd379"
  },
  {
    "url": "dart/language_tour_translate/operators.html",
    "revision": "d7fb600d53449e394e96e6c678080dd7"
  },
  {
    "url": "dart/language_tour_translate/summary.html",
    "revision": "5329ee11888c0a8d2469c46855b3331c"
  },
  {
    "url": "dart/language_tour_translate/to_be_continued.html",
    "revision": "97ed1ecdba15981b7150deb2885ffcf2"
  },
  {
    "url": "dart/language_tour_translate/typedefs.html",
    "revision": "95c580372b085d19f360d4c8eecd8355"
  },
  {
    "url": "dart/language_tour_translate/variables.html",
    "revision": "318681a9e9b841d03f232e63a8b40f7e"
  },
  {
    "url": "index.html",
    "revision": "96bce33670d5758e7a0d4698ba1a81fa"
  },
  {
    "url": "tag/Dart/index.html",
    "revision": "524a990ab93776d9340c652ceb3079ed"
  },
  {
    "url": "tag/Dart/page/2/index.html",
    "revision": "dfb3f7460c10c136a665019465a402b7"
  },
  {
    "url": "tag/index.html",
    "revision": "8af9cb02e3a29abd26ac58c43a795c4d"
  },
  {
    "url": "timeline/index.html",
    "revision": "f3c7767a0a9ee510db1abb289bb9aaad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
