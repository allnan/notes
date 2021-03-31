---
title: "库和可见性"
author: all_nan
date: 2019-10-16 22:36:00
categories: 
 - Dart
tags: 
 - Dart
---

## import和library

使用`import`和`library`指令可以帮助你创建模块化和可共享的代码库。库不只能提供APIs，而且是一个隐私单元：在标识符前面加上一个下划线标志只在该库中可见。`所有的Dart应用都是一个库`，即使没有`library`指令。  
库可以用[包(package)](https://dart.dev/guides/packages)来分发。

## 使用库

用`import`来指定如何在另一个库的范围内使用来自一个库的名称空间。

例如，Dart的web应用通常使用[dart:html](https://api.dart.dev/stable/dart-html)库，则需要这样导入：

```Dart
import 'dart:html';
```

`import`只需要指定一个指向库的URI参数。对于Dart内置的库有特殊的URI:`dart:scheme`。对于其他的库，可以使用文件系统路径或者`package:scheme`。`package:scheme`方式指定了由包管理器（像是pub tool）提供的库。例如：

```Dart
import 'package:test/test.dart';
```

::: tip Note
URI代表统一资源标识符。URLs（uniform resource locators）是一种常用的URI
:::

### 指定库前缀

如果导入了两个标识符冲突的库，这时你可以指定其中一个或者全部的前缀，例如库1和库2中都有Element类，在代码中可以这样写：

```Dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// 使用 lib1 中的 Element.
Element element1 = Element();

// 使用 lib2 中的 Element.
lib2.Element element2 = lib2.Element();
```

### 只导入库的部分内容

如果直想使用一个库的一部分，你可以有选择地导入库，例如：

```Dart
// 只导入foo.
import 'package:lib1/lib1.dart' show foo;

// 导入除了foo之外的所有.
import 'package:lib2/lib2.dart' hide foo;
```

### 懒加载库

*延迟加载*（也叫做*懒加载*）允许web应用按需加载库，仅当这个库被需要时才会加载。遇到以下情况时你可能需要延迟加载：

- 减少一个web应用的初始化启动时间
- 执行一个A/B测试-例如尝试一个替代算法的实现
- 加载很少用到的功能，比如选择页面或者对话框

::: warning 只有dart2js支持懒加载
Flutter、Dart VM和dartdevc都不支持懒加载。更多信息查看[issue #33118](https://github.com/dart-lang/sdk/issues/33118)和[issue #27776](https://github.com/dart-lang/sdk/issues/27776)。
:::

要懒加载一个库，要先用`deferred as`导入库：

```Dart
import 'package:greetings/hello.dart' deferred as hello;
```

当需要使用库时，使用库的标识符调用`loadLibrary()`。

```Dart
Future greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

在上面的代码中，`await`关键词会暂停代码执行直到库加载完毕。更多`async`和`await`的信息请参阅[异步支持](https://dart.dev/guides/language/language-tour#asynchrony-support)。

当你使用懒加载的时候需要注意以下几点：

- 一个懒加载库中的常量在导入文件中不是常量，直到这个库被加载之前，这些常量都不存在。
- 在导入文件中你不可以使用懒加载库中的类型，取而代之地考虑将接口类型定义到另一个库中同时导入到懒加载和当前应用中。
- Dart隐式地在用`deferred as namespace`的命名空间中插入了`loadLibrary()`，`loadLibrary()`函数会返回一个[Future](https://dart.dev/guides/libraries/library-tour#future)。

## 实现库

参考[创建包库](https://dart.dev/guides/libraries/create-library-packages)来查看实现一个库的相关建议，包括：

- 如何组织库的源代码
- 如何使用`export`指令
- 如何使用`part`指令
- 如何使用`library`指令
