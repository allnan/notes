---
title: "注释"
author: all_nan
date: 2019-10-19 17:11:45
categories:
  - Dart
tags:
  - Dart
---

Dart支持单行注释，多行注释和文档注释。

## 单行注释

单行注释用`//`开头，在`//`到行尾中的任何字符都会被Dart编译器忽略。

```Dart
void main() {
  // TODO: 这是一个很长的注释，但是只能在代码中看到我。
  print('Welcome to my Llama farm!');
}
```

## 多行注释

多行注释用`/*`开头用`*/`结尾，所有在`/*`和`*/`之间的字符都会被Dart编译器无视（除非这个注释是文档注释，下一节有讲），多行注释可以嵌套。

```Dart
void main() {
  /*
   * 这也是一个很长的注释，同样你也只能在代码中看到我

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```

## 文档注释

文档注释是以`///`或者`/**`开头的单行或多行注释，在连续的多行注释中使用`///`和多行文档注释有一样的效果。

在文档注释中，Dart编译器会忽略所有方括号外的字符。用方括号可以引用类，方法，字段顶级变量，函数和参数。方括号中的名字会在文档程序元素所在的词法作用域内解析。

下面的例子演示了文档注释，包括了对其他类和参数的引用：

```Dart
/// A domesticated South American camelid (Lama glama).
///
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
class Llama {
  String name;

  /// Feeds your llama [Food].
  ///
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

在生成的文档中，`[Food]`会变成指向Food类文档的链接。

为了解析Dart代码和生成HTML文档，你可以使用SDK中的[文档生成工具](https://github.com/dart-lang/dartdoc#dartdoc)。参考生成的文档，可以查看[Dart API文档](https://api.dart.dev/stable)。想要查看如何组织注释，可以查看[Dart文档注释指南](https://dart.dev/guides/language/effective-dart/documentation)。
