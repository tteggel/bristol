import React, { Component } from 'react';
import Endpoint from './Endpoint';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endpoints: {}
        };
    }

    componentDidMount() {
        this._poller = setInterval(
            () =>
                fetch('/control/endpoints')
                .then( (response) => response.json() )
                .then( (endpoints) => this.setState({endpoints: endpoints}) )
            , 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this._poller);
    }

    render() {
        const endpoints = Object.keys(this.state.endpoints).map( (id) => {
            const endpoint = this.state.endpoints[id];
            return <Endpoint key={endpoint.name} name={endpoint.name} path={endpoint.path} method={endpoint.method}  requests={endpoint.requests} />;
        });

        return (<table><thead></thead><tbody><tr>
                {endpoints}
                </tr></tbody></table>
               );
    }
}

export default App;
