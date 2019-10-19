---
title: "[十三] 可调用类"
author: all_nan
date: 2019-10-19 10:14:47
categories:
  - Dart
tags:
  - Dart
---

你可以让一个Dart类像一个函数一样被调用，前提是实现了`call()`方法。

下面的例子中，`WannabeFunction`类定义了一个`call()`函数接收了三个字符串并把它们连起来，用空格隔开，最后加上了一个感叹号：

:::: tabs
::: tab code

``` Dart
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

main() {
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out');
}
```

:::
::: tab output

``` console
Hi there, gang!
```

:::
::::
