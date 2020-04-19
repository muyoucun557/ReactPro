# render prop

``render prop``是一种在React组件之间使用一个值为函数的prop共享代码的简单技术。

具有render prop的组件接受一个函数，该函数返回一个React元素并调用它而不是实现自己的渲染逻辑。

```JSX
<DataProvider render={(data) => 
    (<h1>Hello {data.target}</h1>)
}/>
```

## 使用``Render Props``来解决横切关注点

组件是React代码复用的主要单元，但如何分享一个组件封装到其他需要相同state组件的状态或行为并不总是很容易。

举个例子。针对获取鼠标移动的操作（实时获取鼠标坐标是个很常见的行为）举个例子。
实现获取鼠标实时位置，打印在页面上
```JSX
class MouseTracker extends React.Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.state = {x:0, y:0}
    }

    handleMouseMove(event) {
        console.log(1)
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        // 100vh，表示100%高度
        return <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
            <p>鼠标位置,x:{this.state.x};y:{this.state.x}</p>
        </div>
    }
}
```
如果要实现，猫追逐鼠标的功能该怎么办？
使用一张猫的图片，实时监听鼠标位置，改写图片位置即可。
针对上面的代码，只需要修改render方法。
怎么能复用这个通用逻辑？可以使用render-prop来解决。
```JSX
class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.state = {
            x: 0,
            y: 0
        }
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                {/*渲染逻辑交给render属性*/}
                {this.props.render(this.state)}
            </div>
        )
    }
}

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse
        return (
            <img style={{ position: 'absolute', left: mouse.x, right: mouse.y }}></img>
        )
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>移动鼠标</h1>
                <Mouse render={mouse => (<Cat mouse={mouse} />)} />
            </div>
        )
    }
}

reactDOM.render(<MouseTracker />)
```
抽象出Mouse组件，渲染逻辑交给render属性
