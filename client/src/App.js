import React, { Component } from 'react';
import './App.css';
import Endpoint from './Endpoint';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endpoints: {}
        };

        this.clear_all = this.clear_all.bind(this);
    }

    componentDidMount() {
        this._poller = setInterval(
            () =>
                fetch('/control/endpoints')
                .then( (response) => response.json() )
                .then( (endpoints) => this.setState({endpoints: endpoints}) )
            , 100
        );
    }

    componentWillUnmount() {
        clearInterval(this._poller);
    }

    clear_all() {
        fetch('/control/endpoints/requests', {method: 'delete'});
    }

    render() {
        const endpoints = Object.keys(this.state.endpoints).map( (id) => {
            const endpoint = this.state.endpoints[id];
            return <Endpoint key={id} id={id} name={endpoint.name} path={endpoint.path} method={endpoint.method} requests={endpoint.requests} canned_response={endpoint.response}/>;
        });

        return (<div>
                <table><thead></thead><tbody><tr>
                {endpoints}
                </tr></tbody></table>
                <button className="btn btn-danger btn-clear fixed-bottom" onClick={this.clear_all}>clear</button>
                </div>
               );
    }
}

export default App;
