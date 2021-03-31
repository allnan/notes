---
title: "异常"
author: all_nan
date: 2019-10-08 16:03:00
categories: 
 - Dart
tags: 
 - Dart
---

## Exceptions

Dart 程序可以获取和抛出异常。异常指出了一些意外的发生，如果异常没有被捕获，Dart 会将异常[隔离](https://dart.dev/guides/language/language-tour#isolates)并挂起，这通常也会导致程序退出。

比起 Java，Dart 所有的异常都是不被禁止的异常，方法不会声明他们可能会抛出什么类型的异常，你也没有被强制要求去捕获异常。

Dart 提供了[Exception](https://api.dart.dev/stable/dart-core/Exception-class.html)和[Error](https://api.dart.dev/stable/dart-core/Error-class.html)类型，以及其预定义的一些子类。当然你可以自定义你自己的异常。然而 Dart 可以抛出除了 Exception 和 Error，还可以抛出任意非空对象来作为一个异常。

## Throw

下面是一个抛出（或者*提出*）一个异常的例子：

```Dart
throw FormatException('Expected at least 1 section');
```

你也可以抛出任意对象：

```Dart
throw 'Out of llamas!';
```

::: tip Note
生产环境下通常抛出实现了[Exception](https://api.dart.dev/stable/dart-core/Exception-class.html)或者[Error](https://api.dart.dev/stable/dart-core/Error-class.html)的实例。
:::

因为抛出一个异常也是一个表达式，你可以用`=>`语句来和在任意允许表达式存在的情况下都可以抛出异常。

```Dart
void distanceTo(Point other) => throw UnimplementedError();
```

## Catch

捕捉或者捕获一个在没有抛出异常的情况下，会阻止异常的传播。捕获异常就有了处理它的机会：

```Dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

为了处理代码中可能抛出多个异常的情况，你可以指定多个捕获条件。第一个与抛出异常类型匹配的捕获条件将处理这个异常。如果捕获条件没有指定类型，它将处理所有抛出的对象。

```Dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // 一个指定的异常
  buyMoreLlamas();
} on Exception catch (e) {
  // 除了异常以外的任意对象。
  print('Unknown exception: $e');
} catch (e) {
  // 没有指定类型，处理所有的异常
  print('Something really unknown: $e');
}
```

如上面例子展示的一样，你可以用`on`或者`catch`或者两者都用。当你需要指定异常类型的时候用`on`，当你需要处理指定异常对象的时候用`catch`。

你可以为`catch()`指定一至两个参数，第一个参数是要抛出的异常，第二个参数是堆栈调用（一个[堆栈跟踪](https://api.dart.dev/stable/dart-core/StackTrace-class.html)对象）。

```Dart {3,5}
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

用`rethrow`关键词来允许异常传播，处理部分异常

```Dart {7}
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // 运行时错误
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // 允许调用查看这个异常。
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

## Finally

为了确保一些代码不论异常是否抛出都能正常运行，需要用`finally`子句。如果没有`catch`子句匹配到异常，异常将在`finally`之后继续传播:

```Dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

`Finally`在任意`catch`匹配到异常后执行：

```Dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

参阅教程中的[Exceptions](https://dart.dev/guides/libraries/library-tour#exceptions)来了解更多。
