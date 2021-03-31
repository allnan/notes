---
title: "[四] 函数"
author: all_nan
date: 2019-09-28
categories: 
 - Dart
tags: 
 - Dart
---

## 函数

Dart 是一个完全面向对象的语言，函数也是对象并且有一个类型[Function](https://api.dart.dev/stable/dart-core/Function-class.html)。这意味着函数也可以被声明为变量，或者可以成为其他函数的参数。当一个类也是一个函数时，你也可以用它来声明实例。更多信息参阅[可调用类](https://dart.dev/guides/language/language-tour#callable-classes)。

## 声明函数

### 一个基本的函数声明

```Dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

尽管 Effective Dart 推荐为公开 API 文档添加类型声明，但是没有声明类型的情况下函数依然可用。

```Dart
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

如果函数中只包含了一个表达式，可以用`=>`指定方法体表达式

```Dart
bool isNoble(int atomicNumber)
 => _nobleGases[atomicNumber] != null;
```

`=> expr`语法是`{return expr;}`的简写，`=>`表达式有时被称为箭头语法。

:::tip Note
当函数中在只存在一个表达式，而不是语句的时候，才可以放在`=>`和`;`中间，例如你不可以放入一个[if 语句](https://dart.dev/guides/language/language-tour#if-and-else)，但是可以用[条件表达式](https://dart.dev/guides/language/language-tour#conditional-expressions)。
:::

一个函数可以拥有两种参数：必要参数和可选函数。必要函数放在参数开始，后面跟上所有的可选参数。可选参数可以是命名参数也可以是位置参数。

:::tip
一些 API 文档中，特别是[Flutter](https://flutter.dev/)组件构造器中，只使用了命名参数，即使参数是强制的。更多细节参考后续内容。
:::

## 可选参数

可选参数可以是命名参数或者位置参数，但不能两者都是。

### 命名参数

当定义一个函数的时候，用`{param1,param2}`来指定命名参数：

```Dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold, bool hidden}) {...}
```

当调用这个函数的时候，可以用`parmaName:value`的形式来指定命名参数:

```Dart
enableFlags(bold: true, hidden: false);
```

虽然命名参数是一种可选参数，但是可以用[@required](https://pub.dev/documentation/meta/latest/meta/required-constant.html)注解来表明该参数是强制的，用户调用该函数的时候必须为这个参数提供一个值：

```Dart
const Scrollbar({Key key, @required Widget child})
```

如果创建上述对象 Scrollbar 的时候没有提供 child 参数，分析器就会抛出一个错误。

要使用[@required](https://pub.dev/documentation/meta/latest/meta/required-constant.html)注解，需要先加入它的依赖包[meta](https://pub.dev/packages/meta)，并且导入`package:meta/meta.dart`。

### 位置参数

通过用`[]`包括函数中的参数来标记这个参数是位置可选参数。

```Dart
String give(String from, String toWho, [String what]) {
  var result = '$from 给 $toWho';
  if (what != null) {
    result = '$result $what';
  }
  return result;
}
```

#### 不调用可选位置参数

```Dart
print(give('埼玉老师', '海怪王'));

//output
//埼玉老师 给 海怪王
```

#### 调用可选位置参数

```Dart
  print(give('埼玉老师', '海怪王','一拳'));

  //output
  //埼玉老师 给 海怪王 一拳
```

例子：

```Dart
//函数
String give(String from, String toWho, [String date, String what]) {
  var result = '$from 给 $toWho';

  if (date != null) {
    result = '[$date] $result';
  }

  if (what != null) {
    result = '$result $what';
  }
  return result;
}

//调用
print(give('埼玉老师', '海怪王'));
print(give('埼玉老师', '海怪王','今天'));
print(give('埼玉老师', '海怪王','一拳'));
print(give('埼玉老师', '海怪王','今天','一拳'));

//输出
//埼玉老师 给 海怪王
//[今天] 埼玉老师 给 海怪王
//[一拳] 埼玉老师 给 海怪王
//[今天] 埼玉老师 给 海怪王 一拳
```

### 默认参数值

函数的参数列表中可以为命名参数和位置参数两者用`=`来声明默认值。默认值必须是编译时常量。如果没有提供默认值，默认值为 null。

#### 命名参数默认值

```Dart
//函数
void normalDay({String getUp = '7:30', String lunch = '12:00', String off_duty = '18:00'}) =>
  print('I usually get up at $getUp,have lunch at $lunch,and go home at $off_duty.');

//调用
normalDay(getUp: '7:20');

//输出
//I usually get up at 7:20,have lunch at 12:00,and go home at 18:00.
```

:::tip 弃用信息
一些老版本的代码可能用`:`而不是`=`来设置命名参数的默认值，以前的版本只用`:`来设置命名参数的默认值，这可能以后会被废弃，所以我们强烈推荐你用`=`来设置默认值。
:::

#### 位置参数默认值

```Dart
//用上面的例子，给位置参数加入默认值
String give(String from, String toWho, [String date = '今天', String what='两拳']) {
  var result = '$from 给了 $toWho';

  if (date != null) {
    result = '[$date] $result';
  }

  if (what != null) {
    result = '$result $what';
  }
  return result;
}

//调用函数
print(give('埼玉老师', '海怪王','昨天'));

//输出
//[昨天] 埼玉老师 给了 海怪王 两拳
```

#### 默认值-其他

你也可以把 lists 或者 maps 对象当成默认值。下面的这个例子，定义了一个函数`doStuff()`，指定了一个 list 和一个 map 作为参数并赋予了默认值。

```Dart
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
```

## main()函数

所有的 Dart app 必须拥有一个顶级函数`main()`，用来当作这个 app 的入口函数。`main()`函数没有返回值，有一个可选的传参`List<String>`。

一个 web app `main()`函数的例子：

```Dart
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
```

:::tip NOTE
上面例子中的`..`语法被称为[级联](https://dart.dev/guides/language/language-tour#cascade-notation-)，通过级联语法，可以对单个对象的多个成员进行多次操作。
:::

一个命令行 app `main()`函数的例子：

```Dart
// Run the app like this: dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);
}
```

你可以使用[args](https://pub.dev/packages/args)库来定义和解析命令行参数。

## 函数作为一级对象

在 Dart 中，可以把一个函数作为参数传入另一个函数中：

```Dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```

也可以用函数声明一个变量：

```Dart {2}
var loudify =
(msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

上面的例子用了一个匿名函数，下节内容将会详解。

## 匿名函数

大多数的函数都被命名了，像是`main()`函数和`printElement()`函数。相对的你也可以创建一个没有名称的函数-匿名函数，有时也被称为`lambda`或者`closure`函数。你可以将匿名方法指向一个变量，这样就可以方便进行一些操作，例如向一个集合中添加或者删除项。

匿名函数看起来和命名函数很像，0 到多个参数、用`,`隔开、可选的类型声明、用`()`包裹...

下面的代码包含了一个函数体

```Dart
([[Type] param1[, …]]) {
  codeBlock;
};
```

下面的代码定义了一个有一个无类型参数`item`的匿名函数，这个函数调用了 list 中的每一项，并且按照每一项的位置和值合成 String 并打印到控制台中。

:::: tabs
::: tab code

```Dart
void main() {
  var list = ['apples', 'bananas', 'oranges'];
  list.forEach((item) {
    print('${list.indexOf(item)}: $item');
  });
}
```

:::
::: tab output

```
0: apples
1: bananas
2: oranges
```

:::
::::

如果函数中只存在一个语句，可以用`=>`来简写。上面的代码中的匿名函数也可以简写成

```Dart
list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
```

## 词法作用域

Dart是一种词汇作用域语言，意味着变量在域中是按照代码的布局的方式静态确定的。你可以根据变量与花括号的相对位置来确定变量是否在域中起作用。

下面嵌套函数的例子解释了多个层级变量的作用域范围：

:::: tabs
::: tab code

```Dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      print(topLevel);
      print(insideMain);
      print(insideFunction);
      print(insideNestedFunction);
    }
  }
}
```

:::
::: tab output

```
true
true
true
true
```

:::
::::

可以看出例子中的`nestedFunction()`函数可以调用所有上层域的变量。

## 词法闭包

词法闭包定义为一个函数对象可以访问它自身域中的对象，即使这个函数是在原本的域之外调用的。

函数可以可以获取它自身周围域中定义的变量。下面的例子中，`makeAdder()`函数获取了变量`addBy`。无论返回的函数在哪里被调用，它都会持有`addBy`变量。

:::: tabs
::: tab code

``` Dart
// 该函数返回一个[向传参i加上addBy]的函数
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

void main() {
  // 生成一个向传参+2的函数
  var add2 = makeAdder(2);

  // 生成一个向传参+4的函数
  var add4 = makeAdder(4);
  print(add2(3));
  print(add4(3));
}
```

:::
::: tab output

``` 
5
7
```

:::
::::

## 函数的一致性

下面是一个测试顶级函数，静态函数，实例函数一致性的例子：

:::: tabs
::: tab code

```Dart
void foo() {} // 一个顶级函数

class A {
  static void bar() {} // 一个静态函数
  void baz() {} // 一个实例函数
}

void main() {
  var x;

  // 和顶级函数比较
  x = foo;
  print('[foo == x] -> ${foo == x}');

  // 和静态函数比较
  x = A.bar;
  print('[A.bar == x] -> ${A.bar == x}');

  // 和实例函数比较
  var v = A(); // Instance #1 of A
  var w = A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  // 这些闭包指向了同一个实例,所以他们是相等的
  print('[y.baz == x] -> ${y.baz == x}');

  // 这些闭包指向了不同的实例,所以他们是不相等的
  print('[v.baz != w.baz] -> ${v.baz != w.baz}');
}
```

:::
::: tab output

```
[foo == x] -> true
[A.bar == x] -> true
[y.baz == x] -> true
[v.baz != w.baz] -> true

```

:::
::::

## 返回值

所有的函数都会返回一个值，如果没有指定返回值，Dart会在函数体中隐式添加上一个`return null;`语句，来默认返回一个null。

:::: tabs
::: tab code

```Dart
foo() {}
void main(){
  print(foo());
}
```

:::
::: tab output

```
null
```

:::
::::
