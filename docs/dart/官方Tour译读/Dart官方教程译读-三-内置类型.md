---
title: 'Dart官方教程译读[三] 内置类型'
author: all_nan
date: 2019-09-10 11:24:09
updated: 2019-09-12 17:43:20
---

## 内置类型

Dart语言内置了以下几种类型，并且提供了特殊支持

- numbers
- strings
- booleans
- lists (arrays)
- sets
- maps
- runes (用string表达Unicode字符)
- symbols

你可以用字符值来初始化这些特殊类型，像是`this is a string`是一个字符串字符值，`true`是一个布尔字符值。

由于Dart中所有的变量都是一个对象---是类的一个实例，所以你通常可以用构造函数来初始化变量。有一部分内置类型有他们自己的构造器。例如你可以用`Map()`构造器来创造一个map对象。

### numbers-数值

Dart中有两种数值类型：

1. int
Integer（整型）值最大支持64位（这取决于运行的平台）。在Dart虚拟机上，Integer值的范围是`-2^63` - `2^63^-1`，编译到JavaScript时使用JavaScript的数值，数值范围是`-2^53` - `2^53^-1`。

2. double
64位的双精度浮点数值，遵循IEEE 754标准。

int和double都是num的子类，数值类型包含了基本的操作符如`+`，`-`，`*`，和`/`，还有`abs()`，`ceil()`，`floor()`，和其他方法也适用于数值类型的机算（像`>>`这种位运算符，被定义在了int类中）。如果num和它的字类中没有你要找的，试试在[dart:math](https://api.dart.dev/stable/2.5.0/dart-math/dart-math-library.html)库中找找。

Integer（整型）数值是没有小数点的数字，例如：

``` Dart
var x = 1;
var hex = 0xADDE335;
```
如果一个数中包含了小数点，它就是一个double数值，例：
``` Dart
var y = 0.1;
var exponents = 1.1e9;
```
从Dart2.1开始，在必要的时候，整型数值会自动转化为double数值。

```Dart
double d = 1;//等同于double d = 1.0;
```
*版本说明：在 Dart 2.1 之前，在 double 上下文中使用一个整数字面量会引发一个错误。*

下面是string和number类型互转的例子：
```Dart
// String -> int
var one = int.parse('1');
assert(one == 1);//pass

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);//pass

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');//pass

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');//pass
```
整型数值支持传统的位运算`<<`，`>>`，AND(&),and OR(|)操作符，例如：
```Dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7); // 0011 | 0100 == 0111
```

以字符值定义的数值都是编译时常量，许多算术表达式也是编译时常量，只要他们的操作数是编译时常量且最后得到一个数值。

```Dart
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;//pass
```
### string-字符串

Dart重得字符串是以UTF-16编码单元组成的序列，可以用单引号也可以用双引号包括文字来创建一个字符串。

```Dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```
在字符串中，可以用`${expression}`的形式插入表达式。如果表达式是一个变量名，可以省略`{}`。Dart会调用对象方法的toString()方法来获取相应的String值。
```Dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');
```

*`==`操作符用来判断两个对象是否相同，如果两个string拥有相同的编码序列，则认为这两个string是相同的。*

可以用`+`来把字符串连接起来。
```Dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```

(除了\n)还有一个方法来创建多行字符串：使用三个引号（单引号或者双引号）。

```Dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

在字符串前面加上一个`r`会得到一个“原始的”字符串（所见即所得，不会转义字符）

```Dart
var s = r'In a raw string, not even \n gets special treatment.';
```

字符串是编译时常量，如果包含插值表达式，只要这些插值表达式能够得出null、数字、字符串或者布尔值，这个插值表达式也是编译时常量，这个字符串也是。

```Dart
// These work in a const string.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// These do NOT work in a const string.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```

*更多信息和string的使用方法，请参考[String和正则表达式](https://dart.dev/guides/libraries/library-tour#strings-and-regular-expressions)篇*

### Booleans-布尔

Dart内置了一个`bool`的类型来表示布尔值。只有两个对象属于布尔值，布尔字符值：`true`和`false`，两者都是编译时常量。

Dart是类型安全的，一位置你不可以这样写代码`if (nonbooleanValue)`或者`assert (nonbooleanValue)`。需要明确地检查值

```Dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

### Lists-列表

绝大多数计算机语言最通用的集合也许就是array（数组）或者有序对象组了。在Dart中，array数组是List对象，大多数人直接叫数组为lists。

Dart中的list看起来像JavaScript中的数组，下面是Dart list示例

```Dart
var list = [1, 2, 3];
```

*Dart推断上面的list类型是list<int>,如果你试图加入一个非integer对象进入该lists，分析器或者运行的时候就会返回一个错误。参考[类型推断](https://dart.dev/guides/language/sound-dart#type-inference)*

Lists从0开始索引，Lists中的第一个元素的索引是0，最后一个元素的索引是list.length - 1。可以用和JavaScript同样的方法来
获取list的长度和元素：

```Dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```
如果打算创建一个编译常量的列表，在列表字符值前面加上const。

```Dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // Uncommenting this causes an error.
```
Dart2.3版本开始引入了拓展操作符`...`和空值感知拓展操作符`...?`，可以很方便地向一个集合中插入多个元素。你可以用拓展操作符将一个list地元素全部插入另一个list中：

```Dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

如果要插入的list可能是null，你可以用空值感知拓展操作符`...?`来避免出现错误。

```Dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```
*更多拓展操作符相关的细节，参阅[拓展操作符建议](https://github.com/dart-lang/language/blob/master/accepted/2.3/spread-collections/feature-specification.md)*

Dart2.3也引入了`collection if`和`collection for`，分别用来根据情况构建集合或者循环构建集合。

- collection if根据掉件选择是否添加某个元素
```Dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```

- collection for循环遍历添加元素
```Dart
  var listOfInts = [10, 20, 30];
  var listOfStrings = [
    '#0',
    for (var i in listOfInts) '#$i'
  ];

  print(listOfStrings);
  //输出
  [#0, #10, #20, #30]
```

*`collection if` 和 `collection for` 的更多用法，请[集合流控制提案](https://github.com/dart-lang/language/blob/master/accepted/2.3/control-flow-collections/feature-specification.md)*

*List类内置了很多操作列表的方法，参考[泛型](https://dart.dev/guides/language/language-tour#generics)和[集合](https://dart.dev/guides/libraries/library-tour#collections)*

### Sets-无序唯一集合

Dart中set是无序并且元素唯一的一个集合。Dart通过set字符值和Set类型来定义和支持Set。