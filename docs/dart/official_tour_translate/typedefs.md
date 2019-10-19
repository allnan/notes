---
title: "[十五] Typedefs"
author: all_nan
date: 2019-10-18 11:10:18
categories:
  - Dart
tags:
  - Dart
---

::: tip
Typedefs：类型定义；定义类型别名；种类定义
:::

在Dart中，函数和字符串、数字一样都是对象。一个*类型定义*或者说*函数别名*，赋予函数类型一个名称，可以在声明字段和返回值的时候使用。当一个函数类型被符值给变量时，类型别名会保留类型信息。

参考下列代码，其中并没有使用类型别名：

```Dart
class SortedCollection {
  Function compare;

  SortedCollection(int f(Object a, Object b)) {
    compare = f;
  }
}

// Initial, broken implementation.？？
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);

  // 我们只知道compare是一个函数
  // 但是不知道它的类型
  assert(coll.compare is Function);
}
```
