class LikeButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {liked: false}
    }
    
    render() {
        if (this.state.liked) {
            return 'You like this.';
        }

        return e('button', {onClick: ()=>this.setState({liked: true})}, 'Like')
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(React.createElement(LikeButton), domContainer);

// 如果想要使用JSX语法，需要引入babel
// <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
// 可参看https://react.docschina.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx