# JSX

JSX是一种JavaScript的语法扩展，同时也引入了html语言的一些特征。下面给出示例
```JSX
const element = <h1>Hello,world</h1>
```

## 为什么使用JSX

React认为渲染逻辑本质与其他UI逻辑内在耦合，比如UI中需要绑定处理事件、在某些时刻状态发生变化时需要通知到UI，以及需要在UI中展示准备好的数据。
React并没有采用将 **将标记与逻辑进行分离到不同文件** 这种人为地分离方式，而是通过二者共同存放在称之为"组件"的松散耦合单位中，来实现 **关注点分离** 。

在Javascript代码中将JSX和UI放在一起时，会在视觉上有辅助作用。

``` JSX
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

JSX语法上更接近Javascript而不是HTML,所以React DOM使用camelCase来定义属性的名称，而不使用HTML属性名称的命名约定。


## JSX防注入攻击

可以安全地在JSX当中插入用户输入内容：
```JSX
const title = response.potentiallyMaliciousInput;
const element = <h1>{title}</h1>
```

React DOM在渲染所输入内容之前，会默认进行 **[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html)**。可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有内容在渲染之前被转换成字符串。这样做可以有效的防止**XSS** 攻击。
