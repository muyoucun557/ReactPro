# 事件处理

## React的事件处理和DOM的事件处理的不同点

- React事件的命名采用小写驼峰，而不是纯小写
- 使用JSX语法时你需要传入一个函数作为事件处理函数而不是一个字符串

传统的html
``` html
<button onclick="activateLasers()">
    Activate Lasers
</button>
```

React中略显不同

```JSX
<button onClick={activateLasers}>
    Activate Lasers
</button>
```

- React中不能通过返回false的方式来阻止默认行为，必须显示的使用``preventDefault``。例如阻止链接默认打开一个新页面。

``` html
<a href="#" onclick="console.log('The link was clicked.'); return false;">
    click me
</a>
```

React中

```JSX
function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked');
    }

    return (
        <a href="#" onclick={handleClick}>
            click me
        </a>
    );
}
```

## 示例代码

下面的``Toggle``组件会渲染一个让用户切换开关状态的按钮

``` JSX
// 按钮会显示两种状态，ON和OFF。初始显示ON，通过点击按钮，按钮会切换状态。
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: true}
        // 绑定this
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return <button onClick={this.handleClick}>{this.state.status ? 'ON' : 'OFF'}</button>
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({status: !this.state.status})
    }
}
```

针对上面的代码，在构造函数中绑定了handleClick的this。这是必须要绑定的。在JavaScript中，class的方法默认不会绑定this。如果你忘记绑定this.handleClick并且把它传入了onClick，当你调用这个函数的时候this的值为``undefined``。
这并不是React的行为；这其实与JavaScript函数工作原理相关。通常情况下，如果你没有在方法后面添加``()``，你应该为这个方法绑定``this``。

疑问: class的方法默认不绑定this是怎么回事？
看下面代码即可

``` JavaScript
class Person {
    constructor() {
        this.name = 'alice';
        this.sayHi2 = this.sayHi2.bind(this);
    }

    sayHi() {
        console.log(`hi, i am ${this.name}`)
    }

    sayHi2() {
        console.log(`hi, i am ${this.name}`)
    }
}

const p = new Person();
const sayHi = p.sayHi;
const sayHi2 = p.sayHi2;

p.sayHi();      // 正常执行
sayHi2();       // 正常执行
sayHi();        // 报错， TypeError: Cannot read property 'name' of undefined
```

除了在构造函数中使用bind方法绑定this，也可以通过其他方式来绑定this。例如
onClick={(e) => this.handleClick(e)}
handleClick = (e) => {
    ....
}