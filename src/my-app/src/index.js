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
