---
title: "类型定义"
author: all_nan
date: 2019-10-19 11:10:18
categories:
  - Dart
tags:
  - Dart
---

::: tip
Typedefs：类型定义；定义类型别名；种类定义
:::

在Dart语言中，函数与String和Number一样都是对象，可以使用`类型定义`（或者叫`方法类型别名`）来为函数的类型命名。使用函数命名将该函数类型的函数赋值给一个变量时，类型定义将会保留相关的类型信息。

参考下列代码，其中并没有使用类型定义：

:::: tabs
::: tab code

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
  print(coll.compare.runtimeType);
}
```

:::
::: tab output

``` 
(Object, Object) => int
```

:::
::::

上面的例子中，当把`f`符值给`compare`的时候，`compare`的类型信息就丢失了。`f`的类型是`(Object, Object) => int`（箭头的意思是返回值），而`compare`的类型是Function。如果我们改变代码，用显式的名称和保留类型信息，开发者和开发信息就都可以使用这个信息了。

```Dart
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```

::: tip Note
目前typedefs仅能对函数使用。
:::

因为类型别名只是简单的别名，他们提供了一个所有函数类型的方法，例如：

```Dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```
