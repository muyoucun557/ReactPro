# Context

Context提供了一个无需为每层组件手动添加props,就能在组件树之间进行数据传递的方法。

React应用中，数据是通过props属性自上而下进行传递的，但这种做法对于某种类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这些属性是应用程序中许多组件都需要的。Context提供了一种在组件之间共享此类值得方式，而不必显示地通过组件树地逐层传递props。

```JSX
// 为当前的theme创建一个context("light"是默认值)
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        // 使用Provider来将当前的theme传递给以下的组件树
        // 无论多深，任何组件都能读取这个值
        // 在这个例子中，我们将“dark”作为当前的值传递下去
        return <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    }
}

class Toolbar extends React.Component {
    static contextType = ThemeContext;
    render() {
        // 组件中不需要再指明往下传递theme了
        return(<div>
            <ThemedButton></ThemedButton>
        </div>)
    }
}

class ThemedButton extends React.Component {
    // 指定contextType读取当前的theme context
    // React会往上找到最近的theme provider，然后使用它的值
    static contextType = ThemeContext;
    render() {
        return <Button theme={this.context}/>
    }
}

class Button extends React.Component {
    render() {
        return (
            <div>{this.props.theme}</div>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('root'));
```

## 使用Context之前的考虑

Context主要应用场景在于很多``不同层级``的组件需要访问同样一些数据。请谨慎使用这些，因为这会使组件的复用性变得很差(缺点)。

为什么这会使代码复用性变得很差？
当前的组件在当前的上下文里有效，移植到别的地方，上下文产生了变化，当前的组件不一定能正常工作。

这种对组件的``控制反转``减少了在你的应用中要传递的props的数量，这在很多场景下使得代码更加干净。但是这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，这使得高层组件变得更复杂，并且会强行将底层组件适应这样的形式，这使得底层组件和高层组件的耦合性变得更强。
