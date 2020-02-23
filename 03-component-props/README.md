# Component and Props

component用于描述页面展示的React元素。
component(组件)允许你将UI拆分为独立可复用的代码片段，并对每个片段进行独立思考。

## 函数组件和class组件

### 函数组件

```JSX
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}
```

上面函数是React组件，它接收唯一带有数据的props对象并返回一个React元素。

### class组件

```JSX
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {props.name}</h1>
    }
}
```

上面是class组件。继承了React.Component；带有render方法，render方法返回React元素


## 渲染组件

React元素可以是用户自定义的组件，例如上述代码就是自定义了Welcome组件。
React元素是自定义的组件时，它会将JSX所接收的属性转换为单个对象传递给组件，这个对象称之为props。

```JSX
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

ReactDOM.render(<Welcome name="Sara" />, document.getElementById('root'));
//组件Welcom的name属性的值是"Sara"，传递给函数的Welcome的参数props就是{name: "Sara"}
```

自定义组件的名称必须是大写开头，如果某个组件的名称是小写开头，那么React会认为这个组件是原生DOM标签。


## Props的只读属性

无论哪种方式声明的组件，都不能修改自身的props。下面的代码会使页面报错。

```JSX
function Welcome(props) {
    // 无论使用下面的哪种方式修改props；均会使页面报错
    // props.name = 'Alice';
    // props = {name: 'Alice'};
    return <h1>{props.name}</h1>;
}

ReactDOM.render(<Welcome name="Sara"/>, document.getElementById('root'));
```

应用程序的UI是动态的，我们该怎么去更新UI呢？
React中有另外一个概念，叫"state"。允许React组件随用户操作、网络响应或者其他变化而修改UI。