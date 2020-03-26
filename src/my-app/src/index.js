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

/*
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
*/


/******************************************************************************** */
//当ref属性用于HTML元素时，构造函数中使用React.createRef()创建的ref接收底层DOM元素作为其current属性。

// ref存储DOM节点的引用
// class CustomTextInput extends React.Component {
//     constructor(props) {
//         super(props)
//         this.textInput = React.createRef()
//         this.focusTextInput = this.focusTextInput.bind(this)
//     }

//     focusTextInput() {
//         this.textInput.current.focus();
//     }

//     render() {
//         return (
//             <div>
//                 <input type="text" ref={this.textInput} />

//                 <input 
//                     type="button"
//                     value="Focus the text input"
//                     onClick={this.focusTextInput}
//                     />
//             </div>
//         );
//     }
// }

// ReactDOM.render(<CustomTextInput />, document.getElementById('root'));

/******************************************************************************** */
// 当ref属性用于自定义class组件时，ref对象接收组件的挂载实例作为其current属性

/*
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

class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.customTextInput = React.createRef()
    }

    componentDidMount() {
        // ref用于自定义class组件时，ref.current指向该组件的实例。下面的this.customTextInput.current指向CustomTextInput组件的实例
        // 调用focusTextInput方法，就是调用了CustomTextInput组件实例的focusTextInput方法
        this.customTextInput.current.focusTextInput()
    }

    render() {
        return <CustomTextInput ref={this.customTextInput}></CustomTextInput>
    }
}

ReactDOM.render(<AutoFocusTextInput />, document.getElementById('root'));
*/



/******************************************************************************** */
// ref不可用于函数组件的属性，但是ref可用于函数组件中

/*
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
ReactDOM.render(<MyFunctionComponent />, document.getElementById('root'));
*/



/******************************************************************************** */
// 回调refs(设置ref的另外一种方式)

// 使用回调refs实现上上个案例
// class CustomTextInput extends React.Component {
//     constructor(props) {
//         super(props)
//         this.textInput = null
        
//         this.setTextRef = element => {
//             // 回调方式和createRef方式有一些区别，回调方式不是current属性，而是变量本身。
//             this.textInput = element
//         }

//         this.textInputFocus = this.textInputFocus.bind(this)
//     }


//     textInputFocus() {
//         this.textInput.focus()
//     }

//     render() {
//         return (
//             <div>
//                 <input type="text" ref={this.setTextRef}/>
//                 <input type="button" onClick={this.textInputFocus} value="Focus on the text input"/>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<CustomTextInput></CustomTextInput>, document.getElementById('root'));



// class CustomTextInput extends React.Component {
//     constructor(props) {
//         super(props)
//         this.textInput = null
        
//         this.textInputFocus = this.textInputFocus.bind(this)
//     }


//     textInputFocus() {
//         this.textInput.focus()
//     }

//     render() {
//         return (
//             <div>
//                 {/* 使用内联函数*/}
//                 <input type="text" ref={(element) => {console.log(element); this.textInput = element;}}/>
//                 <input type="button" onClick={this.textInputFocus} value="Focus on the text input"/>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<CustomTextInput></CustomTextInput>, document.getElementById('root'));


/******************************************************************************** */
// 高阶组件

// function withSubscription(WrappedComponent, selectData) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props)
//             this.handleChange = this.handleChange.bind(this);
//             this.state = {
//                 data: selectData(DataSource, props)
//             };
//         }

//         componentDidMount() {
//             DataSource.addChangeListener(this.handleChange);
//         }

//         componentWillUnmount() {
//             DataSource.removeChangeListener(this.handleChange);
//         }

//         handleChange() {
//             this.setState({
//                 data: selectData(DataSource, this.props)
//             });
//         }

//         render() {
//             return <WrappedComponent data={this.state.data} {...this.props}></WrappedComponent>
//         }
//     }
// }


/******************************************************************************** */
// antd的menu

// import 'antd/dist/antd.css';
// import { Menu } from 'antd';
// import {
//   MailOutlined,
//   AppstoreOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';

// const { SubMenu } = Menu;

// class App extends React.Component {
//   state = {
//     current: 'mail',
//   };

//   handleClick = e => {
//     console.log('click ', e);
//     this.setState({
//       current: e.key,
//     });
//   };

//   render() {
//     return (
//       <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
//         <Menu.Item key="mail">
//           <MailOutlined />
//           Navigation One
//         </Menu.Item>
//         <Menu.Item key="app" disabled>
//           <AppstoreOutlined />
//           Navigation Two
//         </Menu.Item>
//         <SubMenu
//           title={
//             <span className="submenu-title-wrapper">
//               <SettingOutlined />
//               Navigation Three - Submenu
//             </span>
//           }
//         >
//           <Menu.ItemGroup title="Item 1">
//             <Menu.Item key="setting:1">Option 1</Menu.Item>
//             <Menu.Item key="setting:2">Option 2</Menu.Item>
//           </Menu.ItemGroup>
//           <Menu.ItemGroup title="Item 2">
//             <Menu.Item key="setting:3">Option 3</Menu.Item>
//             <Menu.Item key="setting:4">Option 4</Menu.Item>
//           </Menu.ItemGroup>
//         </SubMenu>
//         <Menu.Item key="alipay">
//           <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//             Navigation Four - Link
//           </a>
//         </Menu.Item>
//       </Menu>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'));