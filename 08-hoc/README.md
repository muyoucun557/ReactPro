# HOC 高阶组件

高阶组件是React中用于复用组件逻辑的一种高级技巧。HOC自身不是React API的一部分，它是一种基于React的组合特性而形成的设计模式。

具体而言，```高阶组件是参数为组件，返回值为新组件的函数```

```JSX
const EnhanceComponent = higherOrderComponent(WrappedComponent);
```

组件是将props转换成UI，高阶组件是将组件转换成另外一个组件。

## 使用高阶组件解决横切关注点问题

```
我们之前建议使用mixins用于解决横切关注点问题，但是我们意识到mixins会产生更多的麻烦。
https://react.docschina.org/blog/2016/07/13/mixins-considered-harmful.html 介绍了为什么要抛弃mixins.
```

组件是React中代码复用的基本单元。但是某些模式并不适合传统组件。

假设有一个comment list组件，它订阅外部数据源，用以渲染评论列表。
```JSX
class CommentList extends React.component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            comments: DataSource.getComments()
        }
    }

    componentDidMount() {
        // 订阅
        DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange)
    }

    handleChange() {
        this.setState({
            comments: DataSource.getComments()
        });
    }

    render() {
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id}>
                ))}
            </div>
        )
    }
}
```

这里同时也有另外一个用于订阅博客的帖子，该帖子遵循相同的模式，唯一的区别在于：从数据源获取数据时调用的方法不同，获取博客数据调用的方法是DataSource.getBlogs()

此时我们需要将这样的逻辑抽象出来。
```JSX

function withSubscription(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.handleChange = this.handleChange.bind(this)
            this.state = {
                data: selectData(DataSorce, props)
            }
        }

        componentDidMount() {
            DataSource.addChangeListener(this.handleChange)
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange)
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            })
        }

        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }
}
```

我们需要一个抽象，允许我们在一个地方定义一个逻辑，并且在许多组件之间共享它。这是高阶组件擅长的地方。

## some api

### React.memo

```
const MyComponent = React.memo(function MyComponent(props) {
    /* 使用props渲染 */
});
```

React.memo是高阶组件，适用于函数组件。

如果该组件在给定相同props的情况下渲染出相同的结果，可以将其包装在React.memo中调用，以此通过记忆组件渲染结果的方式提高组件性能表现。这种情况下，React将跳过渲染组件的操作直接复用最近一次的渲染结果。