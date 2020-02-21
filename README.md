# What is React

**React** 是一个用于构建用户页面的JavaScript的库

## Feature

### 声明式

React使创建交互式UI变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时能有效的更新并正确地渲染组件。

以声明式编写UI，可以使你的代码更加可靠，且方便调试。

#### 声明式

主要的编程范式有

- 命令式编程
- 声明式编程
- 函数式编程
- 面向对象编程

声明式是一种编程范式

##### 对比命令式编程和声明式编程

###### 命令式编程

通过代码，告诉计算机一步一步做什么（面向过程编程？）。举个例子

``` JavaScript
// 
const arr = [1, 2, 3]
const doubles = [];

for (let i = 0; i < arr.length; i++) {
    doubles.push(arr[i] * 2);
}
```

###### 声明式编程

通过代码告诉计算机，我们想要什么。

``` JavaScript
const doubleFn = ele => (ele * 2);

const arr = [1, 2, 3];
const doubles = arr.map(doubleFn);
```

###### 优点

将具体实现抽离出来，使代码更加简洁易懂，便于维护。


### 组件化

创建拥有各自状态的组件，再由这些组件构成更加复杂的UI。
组件使用JavaScript编写而非模板，因此你可以轻松地在应用中传递数据，并使得状态与DOM分离。

### 跨平台

无需重写代码。

## How to create react-app

### 通过HTML的script标签引入React

[点击参看实例代码](./src/react.html)

### 使用JavaScript的工具链
