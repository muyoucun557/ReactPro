# State And LifeCycle

我们使用render方法来渲染React元素，如果要更新一个UI，可以二次调用render方法来重新渲染。例如下面的例子。

``` JSX
function tick() {
    const element = <h2>It is {new Date().toString()}.</h2>
    ReactDOM.render(element, document.getElementById('root'));
}

// 通过多次调用，重新渲染同一个UI，来达到更新UI的目的。
setInterval(tick, 1 * 1000);
```

上面的代码可以进行优化
``` JSX
function Clock(props) {
    return <h2>It is {props.date.toString()}</h2>
}

function tick() {
    ReactDOM.render(<Clock date={new Date()}/>, document.getElementById('root'));
}

setInterval(tick, 1000);
```

最理想的情况下是希望组件能自我更新
``` JSX
ReactDOM.render(<Clock />, document.getElementById('root'));
```

## LifeCycle

组件第一次被渲染到DOM的时候，会调用组件的componentDidMount函数。
组件第一次被渲染到DOM，被称之为"挂载"。

组件被销毁的时候，会调用组件的componentWillUnmount函数。
组件被销毁，称之为"卸载"。

## State

组件可以调用setState方法来更新UI。

## Clock代码

``` JSX

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return <h2>It is {this.state.date.toString()}</h2>
    }

    // 组件第一次渲染到DOM的时候会执行componentDidMount函数
    // 组件第一次被渲染称为挂载
    componentDidMount() {

        // 打印log
        console.log(`mount: ${new Date().toString()}`);

        const self = this;
        // 设置间隔定时器，定时调用setState方法，从而达到定时更新的效果
        this.timerID = setInterval(function() {
            self.setState({date: new Date()})
        }, 1000)
    }

    // 组件被清除的时候会执行componentWillUnmount函数
    // 组件被清除被称为卸载
    componentWillUnmount() {

        // 打印log
        console.log(`unmount: ${new Date().toString()}`);
        clearInterval(this.timerID);
    }
}
ReactDOM.render(<Clock />, document.getElementById('root'));
```

上述的代码即实现了Clock的定时更新。
并且从日志可以看出componentDidMount被调用了一次，componentWillUnmount未被调用，setState会进行内部更新组件。


## 正确的使用State

- 直接修改state的值并不会更新UI，必须调用setState。

- State的更新可能是异步的。

- State的更新会被合并

setState会把提供的对象合并到当前的state中。