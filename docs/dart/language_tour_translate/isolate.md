---
title: "Isolates"
author: all_nan
date: 2019-10-19 10:36:20
categories:
  - Dart
tags:
  - Dart
---

::: tip
Isolate：隔离、独立
:::

大多数电脑甚至移动平台都有多核CPU，为了充分利用多核的优势，开发者通常使用共享内存的线程来并发运行程序。然而，共享状态的并发容易导致错误而且使得代码更加复杂。

Dart代码运行在`isolate`，而不是线程中。每一个isolate都有独自的内存堆，保证了其他的isolate不能访问其isolate的状态。

Isolate像详细解释，请参考下列文章：

- [Dart异步编程：Isolate和事件循环](https://medium.com/dartlang/dart-asynchronous-programming-isolates-and-event-loops-bffc3e296a6a)
- [dart:isolate API参考](https://api.dart.dev/stable/dart-isolate)，包括了[isolate.spwan()](https://api.dart.dev/stable/dart-isolate/Isolate/spawn.html)和[可转移类型数据](https://api.dart.dev/stable/dart-isolate/TransferableTypedData-class.html)
- Flutter网站的[后台分析](https://flutter.dev/docs/cookbook/networking/background-parsing)教程
- [Isolate示例应用](https://github.com/flutter/samples/tree/master/isolate_example)
