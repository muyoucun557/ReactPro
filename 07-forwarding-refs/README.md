# Refs

## Refs And the DOM

Refs提供了一种方式，允许我们访问DOM节点或者在render方法中创建地React元素。

在典型地React数据流中（自上而下，自父组件到子组件），props是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的props来重新渲染它。但是在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素。对于这两种情况，React都提供了解决方案。

### 创建Refs

Refs是使用``React.createRef()``创建的,并通过``ref``属性附加到React元素.在构造组件时,通常将Refs分配给实例属性,以便可以在整个组件中引用他们.
```JSX
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    render() {
        return <div ref={this.myRef}>
    }
}
```

### 访问Refs
当ref传递给render中的元素时,对该节点的引用可以在ref的current属性中被访问.
```JSX
const node = this.myRef.current
```

ref的值根据节点的类型而有所不同:
- 当ref属性用于HTML元素时,构造函数中使用React.createRef()创建的ref接收底层DOM元素作为其current属性
- 当ref属于自定义class组件时,ref对象接收组件的挂载实例作为其current属性
- 不能在函数组件上使用ref属性,因为他们没有实例

下面的代码解释了ref属性用于HTML元素时的场景
``` JSX
// CustomTextInput实现的功能是:点击按钮,光标会聚焦到输入框中
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.textInput} />

                <input 
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                    />
            </div>
        );
    }
}

ReactDOM.render(<CustomTextInput />, document.getElementById('root'));
```

React会在组件挂载时给``current``属性传入DOM元素,并且在卸载时传入null.ref会在``componentDidMount``或者``componentDidUpdate``生命周期钩子触发前更新.


官网给出的ref用于class组件时的案例，没看明白。

### 函数与Ref

不能在函数组件上使用ref属性，因为函数组件没有实例。
但是函数组件中可以使用ref
```JSX
function MyFunctionComponent() {
    let textInput = React.createRef();
    let handleClick = function() {
        textInput.current.focus();
    }
    return (
        <div>
            <input type="text" ref={textInput}/>
            <input type="button" value="Focus the text input" onClick={handleClick}/>
        </div>
    )
}
```

### 回调Ref

React支持另外一种设置refs方式，称为“回调refs”。它能助你更精细地控制何时ref被`设置`和``解除``。

不同于传递``createRef()``创建的``ref``属性，你会传递一个函数。这个函数接受React组件实例或者HTML DOM元素作为参数，以使他们能在其他地方被存储或者访问。

```JSX
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = null

        this.setTextRef = element => {
            // 回调方式和createRef方式有一些区别，回调方式不是current属性，而是变量本身。
            this.textInput = element
        }

        this.textInputFocus = this.textInputFocus.bind(this)
    }

    textInputFocus() {
        this.textInput.focus()
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.setTextRef}/>
                <input type="button" onClick={this.textInputFocus} value="Focus on the text input"/>
            </div>
        );
    }
}
```

如果``ref``回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数``null``，然后第二次会传入参数DOM元素。这是因为在每次渲染时会创建一个新的函数实例，所以React清空旧的ref并且设置新的。通过将ref的回调函数定义成class的绑定函数的方式可以避免上述问题，但是大多数情况下是无关紧要的。

``` JSX
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = null
        
        this.textInputFocus = this.textInputFocus.bind(this)
    }


    textInputFocus() {
        this.textInput.focus()
    }

    render() {
        return (
            <div>
                {/* 使用内联函数*/}
                <input type="text" ref={(element) => {console.log(element); this.textInput = element;}}/>
                <input type="button" onClick={this.textInputFocus} value="Focus on the text input"/>
            </div>
        );
    }
}

ReactDOM.render(<CustomTextInput></CustomTextInput>, document.getElementById('root'));
```
上述代码使用的是内联函数方式定义的ref回调，但是结果并没有输出两次。why?

## Ref转发

Ref转发是一项将ref自动地通过组件传递到其一子组件的技巧。