---
title: "[八] 类"
author: all_nan
date: 2019-10-08 23:03:00
---

## 类

Dart 是一个构建在类与基于`mixin`（1.[Mixin Wikipedia](https://zh.wikipedia.org/wiki/Mixin)， 2. [Mixins in Dart 知乎讨论](https://zhuanlan.zhihu.com/p/74441835)）继承之上的面向对象的语言。所有的对象都是类的实例，并且所有的对象都派生自[Object](https://api.dart.dev/stable/dart-core/Object-class.html)。**基于 Mixin 继承**意味着虽然每个类（除了 Object）都只能有一个父类，但是一个类的主体可以在多个类层次中重复调用。

## 调用类成员

对象的成员是由函数和数据（分别是方法和实例变量）组成的。调用方法时，你是用一个对象来调用它的：这个方法访问了这个对象的函数和数据。

用一个点（`.`）来引用一个实例的变量或者方法：

```Dart
var p = Point(2, 2);

// 设置实例p的变量y的值
p.y = 3;

// 获取实例p的变量y的值
assert(p.y == 3);

// 调用p的方法 distanceTo()
num distance = p.distanceTo(Point(4, 4));
```

当需要避免实例为空产生异常时，不要用`.`，用`?.`来调用方法或变量。

```Dart
// 如果p不为null, 设置p的变量y值为4.
p?.y = 4;
```

## 使用构造器

你可以用构造器来创建一个对象。构造器可以用`类名`或者`类名.标识符`来命名。例如，下列例子用`Point()`和`Point.fromJson()`构造器来创建`Point`对象。

```Dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

下列代码和上面的例子等效，只是在构造器前面添加了可选的`new`关键词。

```Dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

:::tip Version Note
在 Dart<Badge text = "2.0" vertical = "middle"/>之后，`new`关键词是可选的。
:::

有一些类会提供[常量构造器](https://dart.dev/guides/language/language-tour#constant-constructors)。在构造器名称前加上`const`关键词来调用常量构造器创建一个编译时常量。

```Dat
var p = const ImmutablePoint(2, 2);
```

用相同的构造方法参数构造两个编译时常量结果会是同一个实例。

```Dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // a与b是同一个实例
```

在一个*常量上下文*中，字符值和构造器之前的`const`可以省略。下列例子中创建了一个常量 map，一个使用了很多 const，一个只在一开始用了 const：

:::: tabs
::: tab Lots-const

```Dart
// 用了很多const
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10),
                 const ImmutablePoint(-2, 11)],
};
```

:::
::: tab Less-const

```Dart
// 只有建立constant上下文的时候用了const
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10),
           ImmutablePoint(-2, 11)],
};
```

:::
::::

如果常量构造函数位于常量上下文之外，而且没有用const声明调用，它将创建一个非常量对象：

```Dart
//创建一个常量
var a = const ImmutablePoint(1, 1);
//不会创建一个常量
var b = ImmutablePoint(1, 1);

//a与b不是同一个实例
assert(!identical(a, b));
```

:::tip Version Note
在 Dart<Badge text = "2.0" vertical = "middle"/>之后，常量上下文内部的const关键词是可选的。
:::

## 获取对象类型

在运行时获取对象的类型，可以调用对象的`runtimeType`属性，会返回一个[Type](https://api.dart.dev/stable/dart-core/Type-class.html)对象。

```Dart
print('The type of a is ${a.runtimeType}');
```

至此，你已经看到了怎么去*使用*类，本章剩下的节会展示如何*实现*类。

## 实例变量

下面是如何声明实例变量的例子：

```Dart
class Point {
  num x; // 声明实例变量x，初始值为null
  num y; // 声明y，初始值为null
  num z = 0; // 声明z，初始值为0
}
```

未初始化的实例变量值都为null。

实例变量会生成一个隐式的`getter`方法，非final实例变量也会生成隐式的`setter`方法。细节讨论请参阅[Getters and setters](https://dart.dev/guides/language/language-tour#getters-and-setters)。

```Dart
class Point {
  num x;
  num y;
}

void main() {
  var point = Point();
  point.x = 4; // 调用x的setter方法
  assert(point.x == 4); // 调用了x的getter方法
  assert(point.y == null); // 值得默认值为null
}
```

如果你在声明一个实例变量得时候就赋予了初始值（不是在构造器或者方法中），它就会在构造器和初始化列表执行之前，在变量被创建的时候被符值。

## 构造器

通过声明一个和类名称一样名字的函数来创造一个该类的构造器（另外，还可以在默认构造器上加上一个额外的标识符，在[命名构造函数](https://dart.dev/guides/language/language-tour#named-constructors)有详解）。最常见的构造函数形式，是生成构造函数，会产生一个类的实例：

```Dart
class Point {
  num x, y;

  Point(num x, num y) {
    // 下文还有更好的实现方式。
    this.x = x;
    this.y = y;
  }
}
```

`this`关键词引用当前实例。

:::tip
请只有在命名冲突的时候使用`this`，否则Dart规范会忽略`this`。
:::

将构造函数的值用来初始化实例变量，是很常见的操作，Dart有一个语法糖来简化这个过程：

```Dart
class Point {
  num x, y;

  // 设置x和y的语法糖
  // 在构造函数执行前执行。
  Point(this.x, this.y);
}
```

### 默认构造器

如果一个类中没有声明构造器，Dart会提供一个默认的构造器。默认构造器是无参的并且会调用父类中的无参构造器。

### 构造器不被继承

子类不会继承父类中的构造器。声明一个没有构造函数的字类只拥有一个默认构造器（没有名称和参数）。

### 命名构造器

使用命名构造器来实现多个构造器或者让代码更易读：

```Dart {7}
class Point {
  num x, y;

  Point(this.x, this.y);

  // 命名构造器
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

需要注意的是构造器不会被继承，意味着父类的构造器不会被其子类继承。如果需要创建一个包含父类中定义的命名构造器的子类，需要在子类中手动实现改构造器。

### 调用父类非默认构造器

默认情况下子类的构造器会调用父类中的无名称无参构造器。父类的构造器会在子类的构造器之前被调用。如果一个调用了初始化列表，它会在父类的构造器之前执行。总结下来，执行顺序如下所示：

1. 初始化列表
2. 父类的无参构造器
3. 主类的无参构造器

如果父类中没有无参无名构造器，你必须手动调用父类构造器中的其中一个。用(`:`)跟上父类构造器放在构造体之前（如果存在的话）来指定要调用的构造器。

下面的例子中，**Employee**类的构造器调用了父类**Person**的命名构造器。

:::: tabs
::: tab Person

``` Dart
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}
```

:::
::: tab Employee

``` Dart
class Employee extends Person {
  // Person类没有默认构造器
  // 必须调用 super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}
```

:::
::: tab code

``` Dart
main() {
  var emp = new Employee.fromJson({});

  if (emp is Person) {
    // 类型检查
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}
```

:::
::: tab output

``` console
in Person
in Employee
```

:::
::::

因为父类构造器中的参数在被调用前会被求值，所以参数可以是函数调用这样的表达式：

```Dart
class Employee extends Person {
  Employee() : super.fromJson(getDefaultData());
  // ···
}
```

::: Warning
父类构造函数中的参数不能使用`this`。例如参数可以调用静态方法但是不可以调用实例方法。
:::

## 初始化列表

除了调用父类构造器，还可以在构造器运行之前初始化实例变量。初始化值之间用`,`分隔。

```Dart
// 构造器执行之前初始化变量
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

::: Warning
每个初始化值的右侧都不能使用this
:::

程序开发中可以用`assert`来验证初始化列表
