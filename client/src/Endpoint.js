import React, { Component } from 'react';
import Request from './Request'

class Endpoint extends Component {
    constructor(props) {
        super(props);

        this.requestClick = this.requestClick.bind(this);
    }

    requestClick() {
        fetch(this.props.path, { method: this.props.method });
    }

    render() {
        const requests = this.props.requests.map((req) => <Request method={req.method} path={req.path} body={req.body} />);

        return (
                <td>
                <h1>{this.props.name}</h1>
                <button onClick={this.requestClick}>Request</button>
                <ul>{requests}</ul>
                </td>
        );
    }
}


export default Endpoint;
