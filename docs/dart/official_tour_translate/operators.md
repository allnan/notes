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

### 算术操作符

Dart 支持下表中的常用算数操作符

| 操作符  | 作用                                 |
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

```

:::
::: tab output

:::
::::
