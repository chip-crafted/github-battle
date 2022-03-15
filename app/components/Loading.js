import React from "react";
import PropTypes from "prop-types";

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: props.text
        }
    }

    componentDidMount() {
        const {speed, text} = this.props

        // creates memory leak unless removed after loading stops
        // setting instance properties allows us to use this.interval in componentWillUnmount()
        this.interval = window.setInterval(() => {
            console.log('HERE')
            this.state.content === text + '...'
                ? this.setState({ content: text})
                //updating current based on previous -- set state has old version
                : this.setState(({content}) => ({content: content + '.'}))
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}