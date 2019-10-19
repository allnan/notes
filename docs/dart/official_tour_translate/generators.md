---
title: "[十二] 生成器"
author: all_nan
date: 2019-10-18 23:31:04
categories:
  - Dart
tags:
  - Dart
---

当需要延迟生成一连串值得时候，可以考虑使用*生成器*。Dart内置支持了两种生成器：

- **同步**生成器：返回[Iterable](https://api.dart.dev/stable/dart-core/Iterable-class.html)对象。
- **异步**生成器：返回[Stream](https://api.dart.dev/stable/dart-async/Stream-class.html)对象。

要实现**同步**生成器，需要用`sync*`来标记函数体，并用`yield`语句传递值：

```Dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

同样的，实现**异步**生成器需要用`async*`来标记函数体，用`yield`语句传递值：

```Dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

如果生成器是递归的，可以用`yield*`来提高它的性能：

```Dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```
