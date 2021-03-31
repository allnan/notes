---
title: "元数据"
author: all_nan
date: 2019-10-19 16:36:14
categories:
  - Dart
tags:
  - Dart
---

使用元数据可以给你的代码添加一些额外信息，元数据注解以字符`@`开头，后面跟上一个编译时常量的引用（像是`deprecated`）或者常量构造器的调用的其中一个。

Dart代码中有两个可用的注解：`@deprecated`和`@override`。比如像[继承类](https://dart.dev/guides/language/language-tour#extending-a-class)中的`@override`的使用。下面是`@deprecated`注解的使用示例：

```Dart
class Television {
  /// _被遗弃: 用[turnOn]替代_
  @deprecated
  void activate() {
    turnOn();
  }

  /// 新方法.
  void turnOn() {...}
}
```

你可以定义自己的元数据注解。下面的例子自定义了`@todo`注解并且携带了两个参数：

```Dart
library todo;

class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

然后就可以在代码中调用这个自定义注解了：

```Dart
import 'todo.dart';

@Todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```

元数据可以出现在库，类，类型别名，类型参数，构造器，工厂，函数，字段，参数变量声明，导入和导出指令之前。在运行时可以使用反射来取回元数据。
