---
title: "[九] 泛型"
author: all_nan
date: 2019-10-15 00:16:00
categories: 
 - Dart
tags: 
 - Dart
---

## 泛型

如果你查看基础的数组类型[List](https://api.dart.dev/stable/dart-core/List-class.html)的API文档，你会发现它的类型其实是`List<E>`。其中的`<...>`符号标注了List是一个泛型（或者是参数化的）——具有类型参数的类型。[按照惯例](https://dart.dev/guides/language/effective-dart/design#do-follow-existing-mnemonic-conventions-when-naming-type-parameters)，大多数的类型参数对是一个字母，像是E、T、S、K和V。

## 为什么使用泛型

泛型一般要求类型安全，但是它除了能让代码运行起来以外还有很多好处：

- 正确地指定泛型类型可以生成更好地代码
- 可以减少代码复用

如果你想创建一个只包含String类型的列表，可以声明为`List<String>`(读作字符串列表)。这样当一个非字符串对象试图加入的时候就会产生一个错误。例如：

::: danger Error

```Dart {3}
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

:::

泛型的另一个好处就是减少代码的复用。它可以在很多类型中公用一个接口和实现，同时保持静态分析的优势。例如以下例子，你想要创建一个缓存对象的接口：

```Dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

然后你发现需要一个指定为String类型的缓存对象的接口，所以又创建了一个接口：

```Dart
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```

后来你又需要一个数字类型的缓存接口...然后你想起了泛型。  
通过泛型你可以不用担心会创建这么多接口，取而代之的是一个有泛型参数的接口：

```Dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

这段代码中，T是一个占位类型。可以认为它是一个开发中会被定义的占位类型。

## 使用集合字面值

List，Set和Map字面量可以是参数化的。参数化字面值和以前用过的字面值差不多，除了在字面值方括号前面加上`<...>`这一点，对List和Set来说是`<type>`，对于Map来说是`<keyType, valueType>`。下面是使用类型字面值的例子：

```Dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

## 构造函数中使用类型参数

要在构造器中使用泛型，使用构造器的时候在类名后面跟上`<type,...>`，例如：

```Dart
var nameSet = Set<String>.from(names);
```

下面的代码创建了一个有int作为键和View作为值的Map类：

```Dart
var views = Map<int, View>();
```
