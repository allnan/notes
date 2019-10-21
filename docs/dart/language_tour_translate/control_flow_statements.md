---
title: "[六] 控制流语句"
author: all_nan
date: 2019-10-06
categories: 
 - Dart
tags: 
 - Dart
---

## 控制流语句

你可以用下列的控制语句来控制 Dart 代码中的流程

- `if`和`else`
- `for`循环
- `while`和`do-while`循环
- `break`和`continue`
- `switch`和`case`
- `assert`

`try-catch`和`throw`也可用来控制流程，在[异常](https://dart.dev/guides/language/language-tour#exceptions)章节有有解释。

## If 和 else

Dart 支持`if`语句和可选的`else`语句，就像下面的例子，参阅[条件表达式](https://dart.dev/guides/language/language-tour#conditional-expressions)。

```Dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```

和 JavaScript 不同，Dart 中的条件必须是布尔值，参阅[布尔值](https://dart.dev/guides/language/language-tour#booleans)获取更多信息。

## For 循环

`for`循环可以用来进行重复操作：

```Dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

Dart`for`循环中的闭环会获取当前索引的值，避免了 JavaScript 中的常见陷阱，例如下列代码：

:::: tabs
::: tab code

```Dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

:::
::: tab dart-output

```console
0
1
```

:::
::: tab js-output

```console
2
2
```

:::
::::

输出的结果是 0 和 1。在 JavaScript 中，会输出两个 2。

如果正在重复操作的对象是一个`Iterable`，你可以调用[forEach()](https://api.dart.dev/stable/dart-core/Iterable/forEach.html)方法，不需要知道当前的索引的情况下，`forEach()`是个很好的选择:

```Dart
candidates.forEach((candidate) => candidate.interview());
```

Iterable 类，像是`List`和`Set`也支持`for-in`格式的[迭代](https://dart.dev/guides/libraries/library-tour#iteration)：

:::: tabs
::: tab code

```Dart
var collection = [0, 1, 2];
for (var x in collection) {
  print(x);
}
```

:::
::: tab output

```console
0
1
2
```

:::
::::

## While 和 do-while

`while`每次循环前会判定条件

```Dart
while (!isDone()) {
  doSomething();
}
```

`do-while`循环每次循环后判定条件

```Dart
do {
  printLine();
} while (!atEndOfPage());
```

## Break 和 continue

用`break`来打断循环：

```Dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

用`continue`忽略之后的代码入下一个循环:

```Dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

如果用了`List`或者`Set`这样的 Iterable 对象，可以用不同的写法写上面的例子：

```Dart
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

## Switch 和 case

在 Dart 中 switch 语句用`==`比较 integer，string 或者编译时常量。被比较的对象必须是同一个类（亦不能是其中的任意子类），并且比较类型不能重载`==`。[枚举类型](https://dart.dev/guides/language/language-tour#enumerated-types)可以应用在 switch 语句中。

::: tip Note
Dart 中 Switch 语句只适用于有限条件的情况，像是 interpreters 和 scanners
:::

所有非空的 case 规定用`break`来结束当前操作，还可以用`continue`、`throw`、或者`return`来结束非空`case`。

用`default`处理没有`case`匹配的情况:

```Dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```

下面的例子省略了一个`case`中的`break`语句，导致了一个错误：

```Dart {5}
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
```

然而，Dart 也支持空`case`条件，允许当前情况向下穿过：

```Dart {3}
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // 空条件向下穿透
  case 'NOW_CLOSED':
    //  CLOSED 和 NOW_CLOSED两种情况都会传到这里
    executeNowClosed();
    break;
}
```

如果想穿透，可以用`continue`+一个标签来标记：

```Dart {5,8}
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // 声明一个nowClosed标签

  nowClosed:
  case 'NOW_CLOSED':
    // CLOSED 和 NOW_CLOSED两种情况都会传到这里
    executeNowClosed();
    break;
}
```

`case`条件中可以拥有一个本地变量，只在当前条件中有效。

## Assert

在程序开发中，可以使用断言语句`assert(condition, optionalMessage);`，如果 condition 是 false，assert 就会终止正常的程序执行。本 tour 中有很多 assert 语句，例如：

```Dart
// 保证text不为null
assert(text != null);

// 保证number小于100.
assert(number < 100);

// 确保$urlString是https开头的
assert(urlString.startsWith('https'));
```

在 assert 的第二个参数中加入一个 string，可以作为断言的额外信息。

```Dart
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```

assert 的第一个参数必须是能解析成布尔值的表达式或者变量，如果布尔值是 true，断言成功代码继续执行，如果为 false，断言失败并且抛出一个[断言错误](https://api.dart.dev/stable/dart-core/AssertionError-class.html)异常。

断言什么时候起作用？取决于你用的工具和框架：

- Flutter 在[debug 模式](https://flutter.dev/docs/testing/debugging#debug-mode-assertions)中开启了断言。
- 像[dartdevc](https://dart.dev/tools/dartdevc)一样默认开启断言的开发者工具。
- 像[dart](https://dart.dev/server/tools/dart-vm)和[dart2js](https://dart.dev/tools/dart2js)等工具可以用命令行`--enable-asserts`开启 assert 支持。

在生产环境中，断言会被忽略，assert 的参数也不会被计算。
