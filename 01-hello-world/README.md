# Hello World

```JSX
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

上面的代码会使浏览器页面显示hello world

## render API

```JSX
ReactDOM.render(element, container[, callback])
```

在提供的**container**中渲染一个React元素，并返回对该组件的引用（或者针对无状态组件返回null）。
如果React元素之前已经在**container**里渲染过，这里会对其执行更新操作，并且会在必要时改变DOM以映射最新的React元素。

如果提供了可选的回调函数，该回调将会在组件被渲染或者更新之后被执行。

### Tips

- **ReactDOM.render()** 会控制你传入容器节点的里的内容。当 **首次调用** 时，容器节点里的所有DOM元素都会 **被替换** ，后续的调用则会使用React的DOM差分算法进行高效的更新。

差分算法优点难，后期会跟进学习。可参看[https://www.jianshu.com/p/21a445066d51?from=timeline](https://www.jianshu.com/p/21a445066d51?from=timeline)

- **ReactDOM.render()** 不会修改容器节点(只会修改容器的子节点)。可以在不覆盖现有子节点的情况下，将组件插入已有的DOM节点中。

