import React from 'react'
import ReactDOM from 'react-dom'

/******************************************************************************** */
/** render渲染一个React元素 */

/*
ReactDOM.render(
    <h1>Hello!</h1>,
    document.getElementById('root')
);
// 页面上会显示标题Hello
/*



/******************************************************************************** */
/** render首次调用时，容器节点里的所有元素都被替换掉 */

/*
const children = React.createElement('div', { id:'children' });
const father = React.createElement('div', { id: 'father' }, children);

ReactDOM.render(father, document.getElementById('root'));
ReactDOM.render(<span>i replace container content</span>, document.getElementById('father'));

// 打开浏览器查看元素可以看到，下面的html代码
{ <div id="root">
    <div id="father">
        <span>i replace container content</span>
    </div>
</div> }
// <div id='father'>的子元素是<span>；元素<span>替换了<div id='childern'> 
*/



/******************************************************************************** */
// render不会修改容器节点（只会修改容器的子节点）。
// 可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中

/*
ReactDOM.render(
    <h1>Hello!</h1>,
    document.getElementById('root')
);

ReactDOM.render(
    <h1>world!</h1>,
    document.getElementById('root')
);
*/

// 调用了2次render方法
// 在浏览器上看到的效果是root的子元素是<h1>world!</h1>，和文档描述的不一致




/******************************************************************************** */
// 组件不能修改自身的props

/*
function Welcome(props) {
    // 无论使用下面的哪种方式修改props；均会使页面报错
    // props.name = 'Alice';
    // props = {name: 'Alice'};
    return <h1>{props.name}</h1>;
}

ReactDOM.render(<Welcome name="Sara"/>, document.getElementById('root'));
*/


/******************************************************************************** */
// 利用state来实现组件组我更新

/*
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
        console.log(`mount: ${new Date().toString()}`)
        const self = this;
        this.timerID = setInterval(function() {
            self.setState({date: new Date()})
        }, 1000)
    }
    
    // 组件被清除的时候会执行componentWillUnmount函数
    // 组件被清除被称为卸载
    componentWillUnmount() {
        console.log(`unmount: ${new Date().toString()}`)
        clearInterval(this.timerID);
    }
}
ReactDOM.render(<Clock />, document.getElementById('root'));
*/



/******************************************************************************** */
// 倒计时60s

/*
class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 60};
    }
    
    render() {
        if (this.state.seconds > 0 ) {
            return <div>倒计时{this.state.seconds}s</div>;
        }
        return <div>倒计时结束</div>;
        
    }

    componentDidMount() {
        const self = this;

        self.timerId = setInterval(function(){

            self.setState((state, props) => {
                return {
                    seconds: --state.seconds
                };
            });
            if (self.state.second === 0) {
                clearInterval(self.timerId);   
            }
        }, 1000);
    }
}

ReactDOM.render(<Countdown />, document.getElementById('root'));
*/


/******************************************************************************** */
// 事件处理

// 在页面显示一个按钮，按钮的初始状态是ON(显示ON)，通过点击切换按钮状态。
/*
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: true}
        // 必须要绑定this；当然也可以通过其他方法绑定this
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return <button onClick={(e) => this.handleClick.call(this,e)}>{this.state.status ? 'ON' : 'OFF'}</button>
    }

    handleClick(e) {
        this.setState((state) => ({status: !state.status}))
    }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
*/


/******************************************************************************** */
// Context

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