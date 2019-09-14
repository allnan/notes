---
title: 'Dart官方教程译读[二] 变量'
tags:
  - Dart
  - 学习
  - Dart学习
categories:
  - Dart学习
toc:
  - title: 变量的类型
    id: 变量的类型
    index: '1'
  - title: 默认值
    id: 默认值
    index: '2'
  - title: Final和const
    id: Final和const
    index: '3'
    children:
      - title: final和const
        id: final和const
        index: '3.1'
      - title: final
        id: final
        index: '3.2'
      - title: const
        id: const
        index: '3.3'
img: ''
author: all_nan
top: 'false'
cover: 'false'
thumbnail: /images/2019/09/09/14429650-d2e6-11e9-9b63-874f37c8b448.svg
date: 2019-09-09 05:41:27
updated: 2019-09-10 11:18:01
---

## 变量的类型

创建一个变量并初始化值的例子：
```Dart
  var name = 'Joe';
```
变量保存的是引用，name这个变量，保存了一个车指向'Joe'字符串的对象引用。name变量的类型被推断为String，但是你也可以手动指定它的类型。如果不限制一个对象的类型，用Object或者dynamic来声明它。
```Dart
//example 
dynamic name = 'Joe';
```
你也可以显式地指定一个变量地类型
```Dart
String name = 'Joe';
```

## 默认值

没有被初始化的变量有一个初始值`null`，所有的变量的初始值都是`null`（像是数字和bool值，因为它们都是Object)。

``` Dart
  int numdefault;
  bool booldefault;
  print('一切对象的默认值都是null');
  print('numdefault = ${numdefault},booldefault = ${booldefault}');
```
输出
```Dart
一切对象的默认值都是null
numdefault = null,booldefault = null
```

## Final和const

### final和const

如果你不打算改变一个常量，用final或者const来修饰它们，而不是var或者除类型名之外的修饰符`(either instead of var or in addition to a type)`。final变量只能被设置一次值，const变量是一个编译常量，（Const常量是隐式final常量），final顶级变量或者类变量在第一次使用的时候被初始化。

**`实例常量只可以是final的，不能用const修饰。Final实例常量必须在构造函数开始前被初始化--在变量声明时、通过构造函数参数或者在构造函数的初始化列表中（进行初始化）`**

### final

创建final常量：

``` Dart
final name = 'Joe';
final age = 13;
final String nickname = 'Chou';
```
一旦被初始化，就不能再改变final常量的值。

```Dart
name = 'Kim';  // Error: a final variable can only be set once.
```
![final常量不能改动值](../images/2019/09/10/8307d860-d373-11e9-8f86-9b3936cfc1fe.jpg)

### const

如果需要定义一个编译时常量，用const来修饰它。如果这个const常量是类常量，需要用static const来修饰。在声明const常量的时候，设置它的值为数字，字符串，另一个常量或者是常量数值的表达式结果。

```Dart
  const String strb = "const String b";
  const strd = "final string d";
```

const不仅仅可以用来声明constant变量，也可以用来创建常量值、声明创建常量值的构造函数，任何变量都可以有一个常量值。

``` Dart
var foo = const [];
final bar = const [];
const baz = []; // 等同于 `const []`
```

在声明一个常量的时候，初始化表达式中的const可以省略，像是`const baz = [];`。

你可以改变一个非final或者const变量的值，即使它有一个常量值

```Dart
var foo = const [];
foo  = [0, 1, 2]; //success
```

常量的值不可以被改变

```Dart
const baz = [];
baz = [7]; //error
```