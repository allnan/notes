---
title: "内置类型"
author: all_nan
date: 2019-09-10 11:24:09
categories: 
 - Dart
tags: 
 - Dart
---

## 内置类型

Dart 语言内置了以下几种类型，并且提供了特殊支持

- [numbers](#numbers-数值)
- [strings](#string-字符串)
- [booleans](#booleans-布尔)
- [lists](#lists-列表) (arrays)
- [sets](#sets-无序唯一集合)
- [maps](#maps)
- [runes](#runes) (用 string 表达 Unicode 字符)
- [symbols](#symbols)

你可以用字面值来初始化这些特殊类型，像是`this is a string`是一个字符串字面值，`true`是一个布尔字面值。

由于 Dart 中所有的变量都是一个对象---是类的一个实例，所以你通常可以用构造函数来初始化变量。有一部分内置类型有他们自己的构造器。例如你可以用`Map()`构造器来创造一个 map 对象。

## Numbers-数值

### 数值类型`int`和`double`

Dart 中有两种数值类型：

#### [int](https://api.dart.dev/stable/dart-core/int-class.html)

  Integer（整型）值最大支持 64 位（这取决于运行的平台）。在 Dart 虚拟机上，Integer 值的范围是`-2^63` - `2^63^-1`，编译到 JavaScript 时使用 [JavaScript 的数值](https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers/2803010#2803010)，数值范围是`-2^53` - `2^53^-1`。

#### [double](https://api.dart.dev/stable/dart-core/double-class.html)

  64 位的双精度浮点数值，遵循[IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754)标准。

int 和 double 都是[num](https://api.dart.dev/stable/2.5.1/dart-core/num-class.html)(数值类型)的子类，数值类型包含了基本的操作符如`+`，`-`，`*`，和`/`，还有`abs()`，`ceil()`，`floor()`，和其他方法也适用于数值类型的机算（像`>>`这种位运算符，被定义在了 int 类中）。如果 num 和它的子类中没有你要找的，试试在[dart:math](https://api.dart.dev/stable/2.5.0/dart-math/dart-math-library.html)库中找找。

Integer（整型）数值是没有小数点的数字，例如：

```Dart
var x = 1;
var hex = 0xADDE335;
```

如果一个数中包含了小数点，它就是一个 double 数值，例：

```Dart
var y = 0.1;
var exponents = 1.1e9;
```

从 Dart2.1 开始，在必要的时候，整型数值会自动转化为 double 数值。

```Dart
double d = 1;//等同于double d = 1.0;
```

::: tip Version Note
版本说明：在 Dart <Badge text="2.1"/> 之前，在 double 上下文中使用一个整数字面量会引发一个错误。
:::

### Number ↔ String

下面是 string 和 number 类型互转的例子：

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

### 其他

整型数值支持传统的位运算`<<`，`>>`，`&`(AND),和`|`(OR)操作符，例如：

```Dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7); // 0011 | 0100 == 0111
```

以字面值定义的数值都是编译时常量，许多算术表达式也是编译时常量，只要他们的操作数是编译时常量且最后得到一个数值。

```Dart
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;//pass
```

## String-字符串

### 创建

Dart 中的字符串是以 UTF-16 编码单元组成的序列，可以用单引号也可以用双引号包括文字来创建一个字符串。

```Dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

### 插值

在字符串中，可以用`${expression}`的形式插入表达式。如果表达式是一个变量名，可以省略`{}`。Dart 会调用对象方法的 toString()方法来获取相应的 String 值。

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

### 操作符

#### 逻辑操作符`==`

`==`操作符用来判断两个对象是否相同，如果两个`string`对象拥有相同的编码序列，则认为这两个`string`是相同的。

#### 拼接操作符`+`

可以用`+`来把字符串连接起来。

``` Dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```

#### 换行操作符`'''`或者`"""`

(除了\n)还有一个方法来创建多行字符串：使用三个引号（单引号或者双引号）。

```Dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

#### r

在字符串前面加上一个`r`会得到一个“原始的”字符串（所见即所得，不会转义字符）

```Dart
var s = r'In a raw string, not even \n gets special treatment.';
```

### String其他

字符串是编译时常量，如果包含插值表达式，只要这些插值表达式能够得出 null、数字、字符串或者布尔值，这个插值表达式也是编译时常量，这个字符串也是。

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

_更多信息和 string 的使用方法，请参考[String 和正则表达式](https://dart.dev/guides/libraries/library-tour#strings-and-regular-expressions)篇_

## Booleans-布尔

Dart 内置了一个`bool`的类型来表示布尔值。只有两个对象属于布尔值，布尔字面值：`true`和`false`，两者都是编译时常量。

Dart 是类型安全的，意味着你不可以这样写代码`if (nonbooleanValue)`或者`assert (nonbooleanValue)`。需要明确地检查值

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

## Lists-列表

绝大多数计算机语言最通用的集合也许就是数组(array)或者有序对象组(List)了。在 Dart 中，array 数组是 List 对象，大多数人直接叫数组为 lists。

Dart 中的 list 看起来像 JavaScript 中的数组，下面是 Dart list 示例

```Dart
var list = [1, 2, 3];
```

_Dart 推断上面的 list 类型是 list\<int\>,如果你试图加入一个非 integer 对象进入该 lists，分析器或者运行的时候就会返回一个错误。参考[类型推断](https://dart.dev/guides/language/sound-dart#type-inference)_

Lists 从 0 开始索引，Lists 中的第一个元素的索引是 0，最后一个元素的索引是 list.length - 1。可以用和 JavaScript 同样的方法来
获取 list 的长度和元素：

```Dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

### 常量List

如果打算创建一个编译常量的列表，在列表字面值前面加上 const

```Dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // Uncommenting this causes an error.
```

### 拓展操作符`...`和`...?`

Dart<Badge text="2.3"/> 版本开始引入了扩展操作符`...`和空值感知扩展操作符`...?`，可以很方便地向一个集合中插入多个元素。你可以用扩展操作符将一个 list 地元素全部插入另一个 list 中：

```Dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

如果要插入的 list 可能是 null，你可以用空值感知拓展操作符`...?`来避免出现错误

```Dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```

:::tip 参阅
更多拓展操作符相关的细节，参阅[扩展操作符建议](https://github.com/dart-lang/language/blob/master/accepted/2.3/spread-collections/feature-specification.md)
:::

### 集合控制操作符

Dart2.3 也引入了`collection if`和`collection for`，分别用来根据情况构建集合或者循环构建集合

#### collection if 根据掉件选择是否添加某个元素

```Dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```

#### collection for 循环遍历添加元素

```Dart
  var listOfInts = [10, 20, 30];
  var listOfStrings = [
    '*0',
    for (var i in listOfInts) '*$i'
  ];

  print(listOfStrings);
  //输出
  [*0, *10, *20, *30]
```

:::tip 参阅
`collection if` 和 `collection for` 的更多用法，请[集合流控制提案](https://github.com/dart-lang/language/blob/master/accepted/2.3/control-flow-collections/feature-specification.md)
:::

:::tip MORE
List 类内置了很多操作列表的方法，参考[泛型](https://dart.dev/guides/language/language-tour#generics)和[集合](https://dart.dev/guides/libraries/library-tour#collections)
:::

## Sets-无序唯一集合

Dart 中 set 是无序并且元素唯一的一个集合。Dart 通过 set 字面值和 Set 类型来定义和支持 Set 类型。

::: tip Version Note
虽然 Set 类型一直是 Dart 核心库的一部分，但是 set 字面值是 Dart<Badge text="2.2"/>以后才被引入的。
:::

### 创建Set对象

例：用 set 字面值来创建 Dart set 对象

```Dart
var sins = {'Pride', 'Envy', 'Gluttony', 'Lust', 'Anger', 'Greed', 'Sloth'};
```

Dart 推断`sins`的类型为`Set<String>`，如果试图加入错误的类型，分析器或者运行时就会抛出一个错误。更多信息请参阅[类型推断](https://dart.dev/guides/language/sound-dart#type-inference)

可以用`{}`来创建一个空 set，但是要对`{}`指定一个类型，或者将`{}`指向一个带类型的 Set

```Dart
var names = <String>{}; //对{}指定类型
set<String> names = {}; // 将{}指向一个带类型的set.
var names = {}; // 这将得到一个map，而不是set.
```

::: tip Set or Map
Set 和 Map 的字面值语法很相近，这是因为 Map 字面值的优先级更高。{}默认为 Map 类型。如果忘记了对{}进行类型声明，或者忘了对{}指向的变量声明类型，Dart 会将这个{}指向的对象创建为`Map<dynamic, dynamic>`类型。
:::

### 添加set项

向一个已存在的 Set 对象里添加项目，可以用`add()`或者`addAll()`方法。

```Dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

### set其他

#### 调用`set.length`来获取 set 中的项目数

```Dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

#### 用`const`来修饰 set 字面值，以创造一个编译时常量

```Dart
final constantSet = const {'Pride', 'Envy', 'Gluttony', 'Lust', 'Anger', 'Greed', 'Sloth'};
// constantSet.add('Conceit'); // 这行代码不会通过编译
```

:::tip 版本更新信息
从 Dart<Badge text="2.3"/>开始，set 和 list 一样支持扩展运算符`...`(拓展操作符)和`...?`(空间感知扩展操作符),并且也支持`ifs`和`fors`这两个集合操作。更多信息请参阅[列表扩展操作符](https://dart.dev/guides/language/language-tour#spread-operator)和[列表集合操作符](https://dart.dev/guides/language/language-tour#collection-operators)的相关讨论。
:::

::: tip MORE
更多 set 的相关资料请参阅[泛型](https://dart.dev/guides/language/language-tour#generics)和[Sets](https://dart.dev/guides/libraries/library-tour#sets)
:::

## Maps

通常来说，一个 map 对象是由复数个相关联的键值对组合而成的。键和值都可以是任意类型，每一个键只会在一个 map 中出现一次，但是同样的值可以出现多次，Dart 支持用 Dart 字面值和 Map 类来`提供/产出/声明`map 变量。

### 创建Map对象

#### 用 map 字面值来创建 Dart map 对象的例子

```Dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

::: tip NOTE
上述代码中，Dart 推断 gifts 是 Map<String, String>类型的，而 nobleGases 是 Map<int, String>类型的。如果试图添加一个错误的类型，分析器或者运行时就会抛出一个错误。更多信息请参阅[类型推断](https://dart.dev/guides/language/sound-dart#type-inference)
:::

#### 使用 Map 构造器来创建一个 map 对象

```Dart
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

:::tip
你可能以为会用`new Map()`而不是`Map()`来创建 Map 对象，从 Dart<Badge text="2.0"/>开始，`new`关键词是可选择的。更多信息参阅[构造方法使用](https://dart.dev/guides/language/language-tour#using-constructors)
:::

### 向Map里添加项

像在 JavaScript 里一样以键值的形式对来向一个 map 对象里添加项

```Dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // 添加一个键值对
```

### 从Map里取出值

和 JavaScript 一样，通过 Key 取回一个值

```Dart
  var sins = new Map();
  sins['Pride'] = "骄傲";
  sins['Envy'] = "嫉妒";
  sins['Gluttony'] = "暴食";
  sins['Lust'] = "色欲";
  sins['Anger'] = "愤怒";
  sins['Greed'] = "贪欲";
  sins['Sloth'] = "懒惰";

  print(sins['Pride']);//output --> 骄傲
```

如果查找一个 map 中不存在的 key，会返回一个 null

```Dart {11}
  var planet = {
    1:'Mercury',
    2:'Venus',
    3:'Earth',
    4:'Mars',
    5:'Jupiter',
    6:'Saturn',
    7:'Uranus',
    8:'Neptune',
  };
  print(planet[9]);//output --> null
```

### Map其他

#### 用`.length`方法来获取 Map 中键值对的数量

```Dart{2}
//承接上述例子代码
print(planet.length);//output --> 8
```

#### 如果想要创建一个运行时常量的 map，再 map 字面值前面加上 const

```Dart {8,9}
  var fourHolyCreatures = const{
    '东':'青龙',
    '南':'朱雀',
    '西':'白虎',
    '北':'玄武',
  };

  fourHolyCreatures['东']='龙';//抛出一个错误
  //Unsupported operation: Cannot set value in unmodifiable Map
```

:::tip 版本更新信息
Dart<Badge text="2.3"/>开始，map开始支持拓展操作符(`...`与`...?`)和(collection if与 for)操作符，就和lists一样，更多信息和例子，参阅[拓展操作符](https://github.com/dart-lang/language/blob/master/accepted/2.3/spread-collections/feature-specification.md)和[集合流控制建议](https://github.com/dart-lang/language/blob/master/accepted/2.3/control-flow-collections/feature-specification.md)
:::

::: tip
更多map的信息，参阅[泛型](https://dart.dev/guides/language/language-tour#generics)和[Maps](https://dart.dev/guides/libraries/library-tour#maps)
:::

## Runes

在Dart中，runes是单个字符串对应的UTF-32编码。

Unicode为世界中所有的书写语言系统中的每一个字母，数字和符号定制了一个独一无二的序号。由于Dart中的字符串是由UTF-16编码单元组成的序列，用字符串来表达32-bit的Unicode值需要特殊的语法。

我们通常用`\uXXXX`来表示一个Unicode编码，其中的`XXXX`是一个四位的16进制数值。例如心形符号(♡)的Unicode编码为`\u2665`，当Unicode的16进制值大于或者小于4位的时候，需要用花括号把16进制值包裹起来，例如，笑脸的emoji(:laughing:)的Unicode编码为`\u{1F606}`。

[String](https://api.dart.dev/stable/dart-core/String-class.html)(字符串)类型拥有一些属性可以用来提取Runes信息。调用`codeUnitAt`和`codeUnit`属性会返回相应的16位编码。调用`runes`属性会得到String对应的runes。

下面的例子演示了runes，16位编码，32位编码之间的关系。

:::: tabs
::: tab code

``` Dart
main() {
  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));
}
```

:::
::: tab output

``` 
//outputs
👏
[55357, 56399]
[128079]
♥  😅  😎  👻  🖖  👍
```

:::
::::

:::warning
当用列表操作符操作Runes的时候需要格外小心，会很容易产生错误，需要区分具体的语言，字符集和具体的操作。更多信息请参阅Stack Overflow上的[如何在Dart中反转一个字符串](http://stackoverflow.com/questions/21521729/how-do-i-reverse-a-string-in-dart)。
:::

## Symbols

一个[Symbol](https://api.dart.dev/stable/dart-core/Symbol-class.html)对象表示Dart程序中已声明的操作符或者标识符，你可能永远也用不到symbols，但是它们在API中对于按名称引用标识符来说是很有用的，因为标识符的缩写改变不会改变标识符symbols

要获取一个标识符对应的symbol，只需要在符号`#`跟上标识符即可。

```Dart
#radix
#bar
```

Symbol 字面值是编译时常量。
