---
title: "异步"
author: all_nan
date: 2019-10-18 15:40:36
categories:
  - Dart
tags:
  - Dart
---

## 异步支持

Dart 库中充满了返回[Future](https://api.dart.dev/stable/dart-async/Future-class.html)或者[Stream](https://api.dart.dev/stable/dart-async/Stream-class.html)对象的函数。这些函数都是*异步*的：它们在建立一个可能的耗时操作（像是 I/O 操作）之后才返回，不用等到操作结束。

`async`和`await`关键词用来支持异步编程，让你可以和写同步代码类似地去写异步代码。

## 处理 Futures

当你需要一个已完成的 Future 结果的时候，你有两个方法：

- 用`async`和`await`
- 用 Future 的 API，在[库教程](https://dart.dev/guides/libraries/library-tour#future)中有描述。

用了`async`和`await`的带码就是异步的，但是看起来很像同步代码。例如，下面的例子用`await`来等待异步函数的结果：

```Dart
await lookUpVersion();
```

使用`await`的前提是函数必须是`async`的（一个用`async`标记的函数）：

```Dart
Future checkVersion() async {
  var version = await lookUpVersion();
  // sth
}
```

::: tip Note
虽然`异步函数`可能会执行耗时操作，但是它并不会等待这些操作，相反的，`异步函数`只有在遇见一个`await`表达式的时候才会执行（[详情](https://github.com/dart-lang/sdk/blob/master/docs/newsletter/20170915.md#synchronous-async-start)）。然后返回一个 Future 对象，当`await`表达式结束的时候才会恢复执行代码。
:::

在使用`await`的时候可以用`try`，`catch`和`finally`来处理错误，整理代码：

```Dart
try {
  version = await lookUpVersion();
} catch (e) {
  // 处理错误
}
```

在一个`异步函数`中可以多次调用`await`：

```Dart
var entrypoint = await findEntrypoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```

在`await`表达式中，表达式的值一般都是一个 Future，如果不是，这个值会自动被包装成一个 Future。这个 Future 对象承诺会返回一个对象。`await`表达式的值是返回一个对象，`await`表达式在这个对象可用之前会暂停执行。

**如果用`await`的时候遇到了编译时错误，确保`await`是在`异步函数`中使用的。** 例如，在一个应用的`main()`函数中使用`await`，这个`main()`必须用`async`标记：

```Dart
Future main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}
```

## 声明异步函数

异步函数指的是用`async`标记了函数体的函数。

给一个函数添加`async`关键词也会让这个函数返回一个 Future 对象，例如，下面的同步函数会返回一个 String，变成异步函数时，因为一个 future 实现是耗时的，返回值也是一个 Future：

:::: tabs
::: tab sync

```Dart
String lookUpVersion() => '1.0.0';
```

:::
::: tab async

```Dart
Future<String> lookUpVersion() async => '1.0.0';
```

:::
::::

需要留意的是函数体不需要使用Future的API。如果必要的话Dart会创建Future对象。如果函数没有返回有用的值，确保它返回`Future<Void>`类型。

有关使用Future、`async`和`await`的更多介绍，请参考[异步编程实验室](https://dart.dev/codelabs/async-await)。

## 处理流

当你需要从流中获取值的时候，你有两个选项：

- 使用`async`和一个异步for循环（`await for`）
- 使用流API，在[库教程](https://dart.dev/guides/libraries/library-tour#stream)中有描述。

::: warning Note
在你使用`await for`之前，确保代码清晰明确并且你确实想要等待流的所有结果，例如，你通常**不**应该在UI监听事件中使用`await for`，因为UI框架会发送无止境的事件流。
:::

一个异步for循环形式大致如下：

```Dart
await for (varOrType identifier in expression) {
  // 每执行一次流都会发射一个值
}
```

其中`expression`的值必须是Stream类型的。执行流程如下：

1. 等待流发射一个值
2. 使用发射的值作为变量，执行循环体
3. 重复步骤1和2知道流关闭

可以在循环中使用`break`和`return`语句来停止监听流，跳出循环并取消订阅该流。

**如果在使用异步for循环的时候出现了编译时错误，确保`await for`是在一个异步函数中使用的。** 例如，在`main()`函数中使用异步for循环的时候，确保用`async`来标记`main()`函数体：

```Dart
Future main() async {
  // ...
  await for (var request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```

更多异步编程的信息，通常可以参阅库教程中的[dart:async](https://dart.dev/guides/libraries/library-tour#dartasync---asynchronous-programming)。
