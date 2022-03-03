import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//component concerns:
//1 state
//2 lifecycle (fetch data/ fxn on event/etc)
//3 UI


export default class App extends React.Component {

    render() {

        return (
            <React.Fragment>
                <h1>Hello, World!</h1>
            </React.Fragment>
        )

    }
}

ReactDOM.render(
    //React Element
    <App />,
    //Where to render element to
    document.getElementById('app')
)