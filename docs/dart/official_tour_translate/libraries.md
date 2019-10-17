---
title: "[十] 库和可见性"
author: all_nan
date: 2019-10-16 22:36:00
categories: 
 - Dart
tags: 
 - Dart
---

## import和library

使用`import`和`library`指令可以帮助你创建模块化和可共享的代码库。库不只能提供APIs，而且是一个隐私单元：在标识符前面加上一个下划线标志只在该库中可见。`所有的Dart app都是一个库`，即使没有`library`指令。  
库可以用[包(package)](https://dart.dev/guides/packages)来分发。
