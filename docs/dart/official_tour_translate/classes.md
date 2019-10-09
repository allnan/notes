---
title: "[八] 类"
author: all_nan
date: 2019-10-08 23:03:00
---

## 类

Dart 是一个构建在类与基于`mixin`（1.[Mixin Wikipedia](https://zh.wikipedia.org/wiki/Mixin)， 2. [Mixins in Dart 知乎讨论](https://zhuanlan.zhihu.com/p/74441835)）继承之上的面向对象的语言。所有的对象都是类的实例，并且所有的对象都派生自[Object](https://api.dart.dev/stable/dart-core/Object-class.html)。**基于Mixin继承**意味着虽然每个类（除了Object）都只能有一个父类，但是一个类的主体可以在多个类层次中重复调用。

## 调用类成员

对象的成员是由函数和数据（分别是方法和实例变量）组成的。调用方法时，你是用一个对象来调用它的：这个方法访问了这个对象的函数和数据。

用一个点（`.`）来