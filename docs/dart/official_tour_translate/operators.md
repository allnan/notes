---
title: "[五] 操作符"
author: all_nan
date: 2019-9-30 17:22:30
---

## 操作符

Dart 定义了下列表中的操作符，其中的多数操作符都可以被重载，参考[可重载操作符](https://dart.dev/guides/language/language-tour#overridable-operators)。

| Description              | 描述                 | Operator                                  |
| ------------------------ | -------------------- | ----------------------------------------- |
| unary postfix            | 一元后置操作符       | `expr++` `expr--` `()` `[]` `.` `?.`      |
| unary prefix             | 一元前置操作符       | `-expr` `!expr` `~expr` `++expr` `--expr` |
| multiplicative           | 乘/除法运算符        | `\*` `/` `%` `~/`                         |
| additive                 | 加/减法运算符        | `+` `-`                                   |
| shift                    | 移位操作符           | `<<` `>>` `>>>`                           |
| bitwise AND              | 按位与操作符         | `&`                                       |
| bitwise XOR              | 按位异或操作符       | `^`                                       |
| bitwise OR               | 按位或操作符         | `|`                                       |
| relational and type test | 关系和类型测试操作符 | `>=` `>` `<=` `<` `as` `is` `is!`         |
| equality                 | 相等性操作符         | `==` `!=`                                 |
| logical AND              | 逻辑与操作符         | `&&`                                      |
| logical OR               | 逻辑或操作符         | `||`                                      |
| if null                  | 空判断操作符         | `??`                                      |
| conditional              | 条件判断符           | `expr1 ? expr2 : expr3`                   |
| cascade                  | 级联操作符           | `..`                                      |
| assignment               | 符值操作符           | `=` `*=` `/=` `+=` `-=` `&=` `^=` etc.    |

::: warning WARNING
操作符的优先权和 Dart 解析器中的表现很相近。更加准确的信息，请参考[Dart 语言规范](https://dart.dev/guides/language/spec)中的代码。
:::

用操作符可以创建表达式：

```console
a++
a + b
a = b
a == b
c ? a : b
a is T
```

在上述的操作符表中，每一个操作符都比它下面的操作符优先级更高。比如取余操作符`%`比等于`=`运算符优先级要高（因为先执行），而等于运算符`=`又比与运算符`&&`优先级高。意味着以下代码的执行顺序方式是相同的

```Dart
// 括号提高了代码的可读性
if ((n % i == 0) && (d % i == 0)) ...

// 效果一致，但是可读性更低
if (n % i == 0 && d % i == 0) ...
```

::: warning WARNING
用于操作两个对象的操作符，左侧的被操作对象决定了这个操作符的版本（作用？）。例如，一个 Vector 对象和一个 Point 对象，`aVector + aPoint`这个表达式中的`+`对应 Vector 版本的`+`
:::

## 算术操作符

Dart 支持下表中的常用算数操作符

| 操作符  | 解释                                 |
| ------- | ------------------------------------ |
| `+`     | 相加                                 |
| `-`     | 相减                                 |
| `-expr` | 取反操作，否定（对表达式的符号取反） |
| `*`     | 乘法                                 |
| `/`     | 除法                                 |
| `~/`    | 除整划分，返回一个 integer 值        |
| `%`     | 取余（取模）                         |

例子

:::: tabs
::: tab code

```Dart
  print('19 ~/ 2 = ${19 ~/ 2}');
  print('2 + 3 = ${2 + 3}');
  print('2 - 3 = ${2 - 3}');
  print('2 * 3 = ${2 * 3}');
  print('5 / 2 = ${5 / 2}'); // 结果是个 double
  print('5 ~/ 2 = ${5 ~/ 2}'); // 结果是个 int
  print('5 % 2 = ${5 % 2}'); // 取余
  print('10 ~/ 3 = ${10 ~/ 3}');
  print('10 % 3 = ${10 % 3}');
```

:::
::: tab output

```Console
19 ~/ 2 = 9
2 + 3 = 5
2 - 3= -1
2 * 3= 6
5 / 2= 2.5
5 ~/ 2= 2
5 % 2= 1
10 ~/ 3 = 3
10 % 3 = 1
```

:::
::::

Dart 也支持前置和后置的自增、自减操作符。

| 操作符  | 解释                                   |
| ------- | -------------------------------------- |
| `++var` | `var = var + 1` 表达式的值为 `var + 1` |
| `var++` | `var = var + 1` 表达式的值为 `var`     |
| `--var` | `var = var - 1` 表达式的值为 `var - 1` |
| `var--` | `var = var - 1` 表达式的值为 `var`     |

:::: tabs

::: tab code

```Dart
  var a = 5, b = 5, c = 5, d = 5;

  print('a = $a, ++a = ${++a}, after this, a = $a');
  print('b = $b, b++ = ${b++}, bfter this, b = $b');
  print('c = $c, --c = ${--c}, cfter this, c = $c');
  print('d = $d, d-- = ${d--}, dfter this, d = $d');
```

:::
::: tab output

```Console
a = 5, ++a = 6, after this, a = 6
b = 5, b++ = 5, bfter this, b = 6
c = 5, --c = 4, cfter this, c = 4
d = 5, d-- = 5, dfter this, d = 4
```

:::
::::

## 相等和关系操作符

下表列出了相等和操作关系操作符

| 操作符 | 解释               |
| ------ | ------------------ |
| `==`   | 相等；参照下方讨论 |
| `!=`   | 不相等             |
| `>`    | 大于               |
| `<`    | 小于               |
| `>=`   | 大于等于           |
| `<=`   | 小于等于           |

确定两个对象是否代表了同一个东西，需要用`==`操作符（在极少数情况下，当你判断带个对象是否为同一个的时候，需要用[identical](https://api.dart.dev/stable/dart-core/identical.html)函数）。下面是`==`操作符工作的流程：

假设有两个对象`x`和`y`

1. 如果`x`或者`y`为 null，当两者都为 null 的时候，返回 true，只有一方为 null 的情况下返回 false。
2. 返回方法`x.==(y)`的调用结果（这是可行的，像是`==`这样的操作符就是调用了第一个操作对象的方法，你可以重载很多操作符，包括`==`，参考[可重载操作符](https://dart.dev/guides/language/language-tour#overridable-operators)）。

下面是相等和关系操作符的一些例子

:::: tabs
::: tab code

```Dart
print('10 == 5 -> ${10 == 5}');
print('10 != 5 -> ${10 != 5}');
print('15 > 10 -> ${15 > 10}');
print('10 >= 5 -> ${10 >= 5}');
print('10 < 15 -> ${10 < 15}');
print('10 <= 5 -> ${10 <= 5}');
```

:::
::: tab output

```console
10 == 5 -> false
10 != 5 -> true
15 > 10 -> true
10 >= 5 -> true
10 < 15 -> true
10 <= 5 -> false
```

:::
::::

## 类型判断操作符

`as`、`is`和`is!`操作符用来在运行时检查类型

| 操作符 | 解释                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| `as`   | 类型转换（也用于指定[库前缀](https://dart.dev/guides/language/language-tour#specifying-a-library-prefix)） |
| `is`   | 如果对象有指定类型，返回 true                                                                              |
| `is!`  | 如果对象有指定类型，返回 false                                                                             |

如果一个对象`obj`实现了接口`T`，表达式`obj is T`就会返回 true。`obj is Object`永远返回 true。

用`as`操作符将对象转换为指定的类型。通常来说，你可以用`as`当作**用`is`判断对象后跟上一个表达式**的简写，如下所示：

:::: tabs
::: tab is

```Dart
if (emp is Person) {
  // 检查类型
  emp.firstName = 'Bob';
}
```

:::
::: tab as

```Dart
//可以用as操作符缩短代码
(emp as Person).firstName = 'Bob';
```

:::
::::

::: tip NOTE
上述代码并不等效，如果`emp`值为 null 或者不是一个 Person 对象，第一个用`is`的例子
不会产生动作，第二个`as`的例子会抛出一个异常。
:::

## 赋值操作符

就像你知道的那样，你可以用`=`操作符来赋值。你还可以用`??=`操作符来仅给值为 null 的对象赋值。

```Dart
// 直接给a赋值
a = value;
// 如果b为null，则给b符值value，否则b保留原始值
b ??= value;
```

组合赋值运算符指像`+=`这样将其他运算符与赋值运算符组合成的带操作的赋值操作符

| `=`  | `-=` | `/=`  | `%=`  | `>>=` | `^=` |
| ---- | ---- | ----- | ----- | ----- | ---- |
| `+=` | `*=` | `~/=` | `<<=` | `&=`  | `|=` |

下面是组合赋值操作符的工作形式

|                        | 组合符值操作符 | 等价表达式   |
| ---------------------- | -------------- | ------------ |
| **对于一个操作符**`op` | `a op = b`     | `a = a op b` |
| **例**                 | `a += b`       | `a = a + b`  |

:::: tabs
::: tab code

```Dart
  dynamic a = 10;
  print('dynamic a = $a');
  print('a += 5 -> a = ${a += 5}');
  print('a -= 5 -> a = ${a -= 5}');
  print('a *= 5 -> a = ${a *= 5}');
  print('a /= 5 -> a = ${a /= 5}');
  print('a = ${a = 49}');
  print('a %= 5 -> a = ${a %= 5}');
  print('a = ${a = 49}');
  print('a ~/= 5 -> a = ${a ~/= 5}');
  print('a = ${a = 2}');
  print('a <<= 2 -> a = ${a <<= 2}');
  print('a >>= 2 -> a = ${a >>= 2}');
  print('a = ${a = 9}');
  print('a &= 5 -> a = ${a &= 5}');
  print('a = ${a = 9}');
  print('a ^= 5 -> a = ${a ^= 5}');
  print('a = ${a = 9}');
  print('a |= 5 -> a = ${a |= 5}');
```

:::
::: tab output

```console
dynamic a = 10
a += 5 -> a = 15
a -= 5 -> a = 10
a *= 5 -> a = 50
a /= 5 -> a = 10.0
a = 49
a %= 5 -> a = 4
a = 49
a ~/= 5 -> a = 9
a = 2
a <<= 2 -> a = 8
a >>= 2 -> a = 2
a = 9
a &= 5 -> a = 1
a = 9
a ^= 5 -> a = 12
a = 9
a |= 5 -> a = 13
```

:::
::::

## 逻辑操作符

用逻辑操作符可以反转或者组合布尔表达式

| 操作符  | 解释               |
| ------- | ------------------ |
| `!expr` | 反转表达式的布尔值 |
| `||`    | 逻辑或             |
| `&&`    | 逻辑与             |

逻辑操作符使用示例

```Dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

## 按位和移位操作符

| 操作符  | 解释                                   |
| ------- | -------------------------------------- |
| `&`     | 按位与                                 |
| `|`     | 按位或                                 |
| `^`     | 按位异或                               |
| `~expr` | 一元按位补码（0s 变成 1s，1s 变成 0s） |
| `<<`    | 向左移位                               |
| `>>`    | 向右移位                               |

按位与移位操作符的例子：

:::: tabs
::: tab code

```Dart
  final value = 0x22;
  final bitmask = 0x0f;

  print('(value & bitmask) = 0x${(value & bitmask).toRadixString(16).toUpperCase()}'); // 按位与
  print('(value & ~bitmask = 0x${(value & ~bitmask).toRadixString(16).toUpperCase()}'); // 按位与然后取补码
  print('(value | bitmask) = 0x${(value | bitmask).toRadixString(16).toUpperCase()}'); // 按位或
  print('(value ^ bitmask) = 0x${(value ^ bitmask).toRadixString(16).toUpperCase()}'); // 按位异或
  print('(value << 4) = 0x${(value << 4).toRadixString(16).toUpperCase()}');  // 向左移位
  print('(value >> 4) = 0x${(value >> 4).toRadixString(16).toUpperCase()}');  // 向右移位
```

:::
::: tab output

```console
(value & bitmask) = 0x2
(value & ~bitmask = 0x20
(value | bitmask) = 0x2F
(value ^ bitmask) = 0x2D
(value << 4) = 0x220
(value >> 4) = 0x2
```

:::
::::

## 条件表达式

Dart 有两种操作符可以让`if-else`表达式更简介

- condition ? expr1 : expr2

  如果条件`condition`为 true，执行表达式`expr1`，否则执行表达式`expr2`

- expr1 ?? expr2

  如果表达式`expr1`不为 null，返回`expr1`的值，反之，返回`expr2`的值

当你需要根据一个布尔表达式判断情况给一个变量赋值的时候，考虑用`?:`：

```Dart
var visibility = isPublic ? 'public' : 'private';
```

如果要进行空值判断，考虑用`??`

```Dart
String playerName(String name) => name ?? 'Guest';
```

上面的例子至少可以用两种方法代替，但是都不够简洁

```Dart
// 用 ?: 操作符.
String playerName(String name) => name != null ? name : 'Guest';

// 用 if-else 判断操作
String playerName(String name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

## 级联操作符

级联(`..`)操作允许对同一个对象进行序列操作，除了函数的调用，你也可以获取对象的字段。级联操作符允许编写链式编码，省掉了创建临时变量的步骤。

观察下列代码

```Dart
querySelector('#confirm') // 一个对象
  ..text = 'Confirm'
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

第一行代码的方法`querySelector()`，返回一个 selector 对象，这个对象后面级联调用的方法，会忽略所有可能返回的值。

上面的例子和下面的代码等效

```Dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```

你也可以嵌套级联操作符：

```Dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```

当函数返回一个确切的对象的时候，调用级联需要谨慎，下面的例子会出错

```Dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // void没有定义`write`方法
```

上面例子种的`sb.write()`会返回一个 void，而级联不能对 void 使用。

::: tip Note
严格来说，“两个点”标记的级联不算一个操作符，它是 Dart 语法中的一部分
:::

## 其他操作符

剩下的大多数操作符已经在以前的例子中多次出现了

| 操作符 | 名称         | 解释                                                                                                                       |
| ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `()`   | 功能应用     | 代表调用一个函数                                                                                                           |
| `[]`   | 列表访问     | 指向列表中指定位置的值                                                                                                     |
| `.`    | 成员访问     | 访问表达式的属性，例如`foo.bar`访问了`foo`的`bar`属性                                                                      |
| `?.`   | 条件成员访问 | 和`.`类似，但是左侧的操作对象可为 null，  例如`foo?.bar`，如果`foo`不为 null 则返回`bar`的值，`foo`为空时，`foo?.bar`为 null |

更多`.`、`?.`和`..`的信息，参阅[类](https://dart.dev/guides/language/language-tour#classes)
