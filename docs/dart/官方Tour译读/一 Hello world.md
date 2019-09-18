---
title: "[一] Hello world"
author: all_nan
date: 2019-09-06 05:11:37
---

本篇文章将展示 Dart 语言的基础特性和语言结构

## 一段基本的 Dart 代码

下面的代码展示了 Dart 语言的基础特征

```Dart
// Define a function.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}

```

### //这是一段普通注释

单行注释，Dart 也支持多行和文档注释

### int

int 是一个类型，Dart 固有的常用类型还有`String` `List` `bool`等

### 42

一个数值，数值是一种编译时常量

### print()

在控制台输出的方法

### 'some text'

or"some text" 表示字符串

### \$variableName

or\${expression}

字符串插值 \$后面跟变量名或者表达式

### main()

main 方法，Dart 程序的入口方法。

### var

声明弱类型变量的一种方式

## 重要概念

当你学习 Dart 的时候，需要记住的概念

- 所有可以保存到变量中的都是一个对象，所有的对象都是*class*的实例，数字，方法，`null`都是对象，所有的对象都继承自*Object.class*
- 尽管 Dart 是强语言类型，变量的类型也可以选择声明，Dart 可以推断出变量的类型。如果想确切地声明一个无类型变量， 需要用 dynamic 声明。
- Dart 支持泛型，例：`List<int>`（数字集合） 、`List<dynamic>`（任意类型集合）
- Dart 支持绑定在类或者对象的方法（静态方法和实例方法），同时也支持顶级函数（比如`main()`方法），也可以在函数中创建函数（嵌套函数和局部函数）
- Dart 支持绑定类和对象的变量（静态和实例变量），实例变量有时被称为字段或者属性。
- 和 Java 不同，Dart 没有像`public`，`protected`和`private`这样的访问修饰符。如果 Dart 文件以`_`开头，这个 Dart 程序就是该库私有的。
- 标识符？（or 文件和变量的命名）可以以字母和下划线开头，跟上字母数字和`_`的音译组合
- Dart 同时拥有表达式（有运行时的值）和语句？（没有运行时的值）。例如，条件表达式`a?b:c`会产生`a`和`b`两个值，而`if-else`语句就没有值产生。一个语句通常包含了一个或者多个表达式，但是表达式不能直接包含语句。
- Dart 会报出两种问题：*warnings*警告和*errors*错误。警告仅仅指出你的代码可能不会产出，但是警告并不会阻碍你程序的执行。错误包含编译错误和执行错误，一个编译错误会阻断代码的编译，一个运行错误会在代码执行的时候提出一个异常。

## 关键词

| abstract ^2^  | dynamic ^2^  | implements ^2^ | show ^1^    |
| :------------ | ------------ | -------------- | ----------- |
| as ^2^        | else         | import ^2^     | static ^2^  |
| assert        | enum         | in             | super       |
| async ^1^     | export ^2^   | interface ^2^  | switch      |
| await ^3^     | extends      | is             | sync ^1^    |
| break         | external ^2^ | library ^2^    | this        |
| case          | factory ^2^  | mixin ^2^      | throw       |
| catch         | false        | new            | true        |
| class         | final        | null           | try         |
| const         | finally      | on ^1^         | typedef ^2^ |
| continue      | for          | operator ^2^   | var         |
| covariant ^2^ | Function ^2^ | part ^2^       | void        |
| default       | get 2        | rethrow        | while       |
| deferred ^2^  | hide ^1^     | return         | with        |
| do            | if           | set ^2^        | yield ^3^   |

避免使用这些单词作为标识符。然而，如果必要，带角标的关键词可以作为标识符：

- 带角标 1 的是 上下文关键词，它们只在特定的地方有有意义。除此之外他们在所有地方都是合法的关键词。
- 带角标 2 的是 内置标识符。为了简化将 JavaScript 代码移植到 Dart 的任务，这些关键字在大多数地方都是有效的标识符，但它们不能用作类或类型名称，也不能用作导入前缀。
- 带角标 3 的是新的，与 [异步支持](# 异步支持) 相关的限制性关键词，在 Dart 1.0 发布后才被加入。在以 async、async\* 或 yield 标识的函数体中，你不能使用 async、await 或者 yield 作为标识符。

关键词表里的其他所有单词都是保留词。你不能使用它们作为标识符。

## Hello World

```Dart
void main(){
  print('Hello world.');
}
```
