---
title: "类"
author: all_nan
date: 2019-10-08 23:03:00
categories: 
 - Dart
tags: 
 - Dart
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

```Dart
var p = const ImmutablePoint(2, 2);
```

用相同的构造方法参数构造两个编译时常量结果会是同一个实例。

```Dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // a与b是同一个实例
```

在一个*常量上下文*中，字面值和构造器之前的`const`可以省略。下列例子中创建了一个常量 map，一个使用了很多 const，一个只在一开始用了 const：

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

如果常量构造函数位于常量上下文之外，而且没有用 const 声明调用，它将创建一个非常量对象：

```Dart
//创建一个常量
var a = const ImmutablePoint(1, 1);
//不会创建一个常量
var b = ImmutablePoint(1, 1);

//a与b不是同一个实例
assert(!identical(a, b));
```

:::tip Version Note
在 Dart<Badge text = "2.0" vertical = "middle"/>之后，常量上下文内部的 const 关键词是可选的。
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

未初始化的实例变量值都为 null。

实例变量会生成一个隐式的`getter`方法，非 final 实例变量也会生成隐式的`setter`方法。细节讨论请参阅[Getters and setters](https://dart.dev/guides/language/language-tour#getters-and-setters)。

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
请只有在命名冲突的时候使用`this`，否则 Dart 规范会忽略`this`。
:::

将构造函数的值用来初始化实例变量，是很常见的操作，Dart 有一个语法糖来简化这个过程：

```Dart
class Point {
  num x, y;

  // 设置x和y的语法糖
  // 在构造函数执行前执行。
  Point(this.x, this.y);
}
```

### 默认构造器

如果一个类中没有声明构造器，Dart 会提供一个默认的构造器。默认构造器是无参的并且会调用父类中的无参构造器。

### 构造器不被继承

子类不会继承父类中的构造器。声明一个没有构造函数的子类只拥有一个默认构造器（没有名称和参数）。

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

需要注意的是构造器不会被继承，意味着父类的构造器不会被其子类继承。如果需要创建一个包含父类中定义的命名构造器的子类，需要在子类中手动实现该构造器。

### 调用父类非默认构造器

默认情况下子类的构造器会调用父类中的无名称无参构造器。父类的构造器会在子类的构造器之前被调用。如果一个调用了初始化列表，它会在父类的构造器之前执行。总结下来，执行顺序如下所示：

1. 初始化列表
2. 父类的无参构造器
3. 主类的无参构造器

如果父类中没有无参无名构造器，你必须手动调用父类构造器中的其中一个。用(`:`)跟上父类构造器放在构造体之前（如果存在的话）来指定要调用的构造器。

下面的例子中，**Employee**类的构造器调用了父类**Person**的命名构造器。

:::: tabs
::: tab Person

```Dart
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}
```

:::
::: tab Employee

```Dart
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

```Dart
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

```
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

::: warning Warning
父类构造函数中的参数不能使用`this`。例如参数可以调用静态方法但是不可以调用实例方法。
:::

### 初始化列表

除了调用父类构造器，还可以在构造器运行之前初始化实例变量。初始化值之间用`,`分隔。

```Dart
// 构造器执行之前初始化变量
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

::: warning Warning
每个初始化值的右侧都不能使用 this
:::

程序开发中可以用`assert`来验证初始化列表

```Dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

当需要设置常量字段的时候使用初始化列表会很方便。下面的例子在初始化列表中给三个 final 字段设置了初始值：

:::: tabs
::: tab Point-class

```Dart
import 'dart:math';

class Point {
  final num x;
  final num y;
  final num distanceFromOrigin;

  Point(x, y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}
```

:::
::: tab main-code

```Dart
main() {
  var p = new Point(2, 3);
  print(p.distanceFromOrigin);
}
```

:::
::: tab output

```
 3.605551275463989
```

::::

### 重定向构造器

有时候一个构造器的目的仅仅是重定向至同一个类的其他构造器。重定向构造器的构造体为空，在重定向构造器后面跟上(`:`)和被引用的构造器即可。

```Dart
class Point {
  num x, y;

  // Point类的主要构造器
  Point(this.x, this.y);

  // 委托给主要构造器
  Point.alongXAxis(num x) : this(x, 0);
}
```

### 常量构造器

如果一个类生成的对象永远不会改变，可以把这些对象变成编译时常量。你需要定义一个`const`构造器并且所有的实例变量都是`final`的。

```Dart
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final num x, y;

  const ImmutablePoint(this.x, this.y);
}
```

常量构造器并不是总是生成常量，参阅[构造器的使用](https://dart.dev/guides/language/language-tour#using-constructors)章节。

### 工厂构造器

如果要创建一个不总是创建一个类的新实例的构造器，使用`factory`关键词来标注。例如，一个工厂构造器可能返回缓存中的实例，也可能返回一个子类的实例。

下面的例子示范了一个工厂构造器返回一个车缓存中的实例：

```Dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

::: tip Note
工厂构造器不能反问 this
:::

调用工厂函数和其他函数的方式一样：

```Dart
var logger = Logger('UI');
logger.log('Button clicked');
```

## 方法

方法是指为对象提供性为的函数

### 实例方法

一个对象的实例方法可以访问实例变量和`this`。下列例子中的`distanceTo()`方法就是一个实例方法：

```Dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

### Getters 和 setters

Getters 和 setters 方法是特殊方法，用来提供对象属性的读写权限。所有的实例变量都有一个隐式的 getter 方法，如果不是 final 变量，还会有一个 setter 方法。可以通过用 get 和 set 实现 getters 和 setters 方法来创建额外的属性：

```Dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // 定义了两个计算值属性: right 和 bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

通过 getters 和 setters，可以先写实例变量，然后包装成方法，甚至都不用更改代码。

::: tip Note
像递增(`++`)这样的操作符，无论是否明确定义了 getter 方法，都能正确执行。为了避免一些意外的影响，操作符只会调用一次 getter 方法，然后把值保存在临时变量中。
:::

### 抽象方法

实例方法、getter 和 setter 方法都可以是抽象方法，定义在一个接口中让其他类来实现抽象的方法。抽象方法只能出现在[抽象类](https://dart.dev/guides/language/language-tour#abstract-classes)中。

定义一个抽象方法，需要用(`;`)来替代方法体：

```Dart
abstract class Doer {
  // 定义实例变量和方法（normal

  // 定义抽象方法
  void doSomething();
}

class EffectiveDoer extends Doer {
  void doSomething() {
    //实现了方法，所以这个方法不是抽象方法。
  }
}
```

## 抽象类

用`abstract`关键词来定义一个不能实例化的抽象类。抽象类在定义接口的时候很有用，通常带有一些实现（？）。如果想要实例化一个抽象类，需要定义[工厂构造器](https://dart.dev/guides/language/language-tour#factory-constructors)。

抽象类通常有若干抽象方法：

```Dart
// 声明了一个抽象类，不能实例化
abstract class AbstractContainer {
  // 声明 构造器, 字段, 方法...

  void updateChildren(); // 抽象方法.
}
```

## 隐式接口

每一个类都隐式地定义了一个包含了所有实例成员和所有它实现的接口的接口。如果想定义一个支持 B 类 API 的 A 类而不继承 B 类的实现，A 类应该实现 B 类的接口。

一个类通过在`implements`分句
中声明接口来实现一个或者多个接口，然后实现这些接口中的 API：

:::: tabs
::: tab Person.class

```Dart
// 一个Person类，隐式接口包括greet()方法
class Person {
  // 在隐式接口中，但是只在当前库中
  final _name;

  //是个构造器，不在隐式接口中
  Person(this._name);

  // 存在于隐式接口中
  String greet(String who) => 'Hello, $who. I am $_name.';
}
```

:::
::: tab Imposter.class

```Dart
// 一个Person接口的实现类
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}
```

:::
::: tab main()

```Dart
String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

:::
::: tab output

```
Hello, Bob. I am Kathy.
Hi Bob. Do you know who I am?
```

:::
::::

一个实现了多个接口的类的简单例子：

```Dart
class Point implements Comparable, Location {...}
```

## 继承类

用`extends`继承一个类来创建一个子类，类中的`super`指向其父类：

```Dart {9,11}
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

### 重写类成员

子类可以重新父类的实例、getters 和 setters 方法。可以用`@override`注解来声明有意要重写的成员：

```Dart {2}
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
```

如果需要缩小代码中方法参数或者实例变量的类型而且保持[类型安全](https://dart.dev/guides/language/sound-dart)，可以使用[covariant 关键词](https://dart.dev/guides/language/sound-problems#the-covariant-keyword)。

### 重载操作符

你可以重载下表中的操作符。例如如果定义了一个矢量类，可以重载`+`操作符让两个矢量相加。

| `<`  | `+`  | `|`  | `[]`  |
| ---- | ---- | ---- | ----- |
| `>`  | `/`  | `^`  | `[]=` |
| `<=` | `~/` | `&`  | `~`   |
| `>=` | `*`  | `<<` | `==`  |
| `-`  | `%`  | `>>` |       |

::: tip Note
你可能发现了`!=`操作符不能被重载。这是因为表达式`e1 != e2`只是`!(e1 == e2)`写法的语法糖。
:::

下面是一个重载`+`和`-`操作符的例子：

:::: tabs
::: tab Vector.class

``` Dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);

  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  @override
  String toString() => '{$x, $y}';

// 操作符==和hashCode没有展示，参阅下方笔记
// ···

}
```

:::
::: tab main()

``` Dart
void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  print('v + w = ${Vector(4, 5)}');
  print('v - w = ${Vector(0, 1)}');
}
```

:::
::: tab output

``` 
v + w = {4, 5}
v - w = {0, 1}
```

:::
::::

如果你重载了`==`操作符，你应该也把该类的`hashCode`获取方法也重写。[实现Map键](https://dart.dev/guides/libraries/library-tour#implementing-map-keys)一栏中有重载`==`和重写`hashCode`的例子。

更多`重写/重载`的信息，参阅[继承类](https://dart.dev/guides/language/language-tour#extending-a-class)。

### noSuchMethod()

为了指出或者响应试图访问不存在方法或者实例变量的代码，你可以重写`noSuchMethod()`：

```Dart
class A {
  // 除非重写了noSuchMethod，不然调用
  // 不存在成员会导致NoSuchMethodError。
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: ' +
        '${invocation.memberName}');
  }
}
```

至少满足以下条件的其中一个的情况下，才可以调用未实现的方法：

- 接收者有静态类型`dynamic`
- 接收者有一个定义了改未实现方法的静态类型（抽象亦可），并且接收者的该动态类型有一个不同于`Object`类的`noSuchMethod()`的实现。

更多信息请参阅[noSuchMethod转发规范](https://github.com/dart-lang/sdk/blob/master/docs/language/informal/nosuchmethod-forwarding.md)。

## 枚举类型

枚举类型，经常被称作`enumerations`(枚举)或者`enums`(枚举)，是一种用来表示固定数量的常量值的特殊类型。

### 使用枚举

用`enum`来声明一个枚举类：

```Dart
enum Color { red, green, blue }
```

每一个枚举中的值都有一个`index`（索引位置）的getter，会从0开始返回该值在枚举声明时的位置。例如，第一个索引是0，第二个索引值是1。

:::: tabs
::: tab code

``` Dart
enum Color { red, green, blue }

void main(){
  Color.values.forEach((f) =>
      print('${f.toString()}.index = ${f.index}'));
}
```

:::
::: tab output

``` 
Color.red.index = 0
Color.green.index = 1
Color.blue.index = 2
```

:::
::::

调用枚举的常量`values`来获取一个枚举中所有值的列表对象。

:::: tabs
::: tab code

``` Dart
enum Color { red, green, blue }

void main(){
  print(Color.values);
}
```

:::
::: tab output

``` 
[Color.red, Color.green, Color.blue]
```

:::
::::

在[switch语句](https://dart.dev/guides/language/language-tour#switch-and-case)可以使用枚举，如果没有处理所有的枚举值会抛出一个警告：

```Dart
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // 没有这一条或者Color.blue，会报出一条Warning
    print(aColor); // 'Color.blue'
}
```

使用枚举类型需要注意以下几点：

- 不能被继承，混合或者实现一个枚举
- 不能显式实例化一个枚举

更多信息请参阅[Dart语言规范](https://dart.dev/guides/language/spec)。

## 用`mixins`给类添加特性

混合（`mixins`）可以用来在多个继承类中复用代码。

用关键词`with`跟上一个或者多个要混合的mixin名称来使用混合，参考下面两个例子：

```Dart {1,6}
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

要实现一个mixin，创建一个继承自Object的类并且不能有构造器。用`mixin`而不是`class`关键词声明，否则只会得到一个常规的类。例如：

```Dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

用`on`指定所指向的父类来声明能用这个mixin的类型。例如，这样你的mixin就可以调用它没有定义的方法：

```Dart
mixin MusicalPerformer on Musician {
  // ···
}
```

::: tip Version Note
从Dart<Badge text="2.1"/>开始`mixin`关键词被引入支持。在之前的版本中通常都是用`abstract class`来声明`mixin`。Dart<Badge text="2.1"/>版本中的mixin变更信息，请参阅[Dart SDK 版本记录](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md)与[2.1 mixin说明与使用规范](https://github.com/dart-lang/language/blob/master/accepted/2.1/super-mixins/feature-specification.md#dart-2-mixin-declarations)。
:::

## 类变量类方法

用`static`关键词来实现类级别的变量和方法。

### 静态变量

静态变量（类变量）在类级别的状态和常量非常有用：

```Dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```

静态变量只有在被用到的时候才会开始初始化。

::: tip Note
本文代码遵循[代码风格指南](https://dart.dev/guides/language/effective-dart/style#identifiers)中的`小驼峰`命名法来为常量命名。
:::

### 静态方法

静态方法（类方法）不能操作实例，并且也不能访问`this`，例如：

```Dart
import 'dart:math';

class Point {
  num x, y;
  Point(this.x, this.y);

  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

::: tip Note
对于通用或者广泛运用的工具类和功能实现，考虑使用顶级方法而不是静态方法。
:::

可以将静态方法用错编译时常量。例如，可以将静态方法当作常量构造器的参数传入。
