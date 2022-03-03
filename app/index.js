import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import './index.css'

//component concerns:
//1 state
//2 lifecycle (fetch data/ fxn on event/etc)
//3 UI


export default class App extends React.Component {

    render() {

        return (
            <div className='container'>
                <Popular />
            </div>
        )

    }
}

ReactDOM.render(
    //React Element
    <App />,
    //Where to render element to
    document.getElementById('app')
)