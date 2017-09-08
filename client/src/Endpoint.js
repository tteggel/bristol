import React, { Component } from 'react';
import Request from './Request';
import CannedResponse from './CannedResponse';

class Endpoint extends Component {
    constructor(props) {
        super(props);

        this.request_click = this.request_click.bind(this);
    }

    request_click() {
        fetch(this.props.path, { method: this.props.method });
    }

    render() {
        const requests = this.props.requests.map((req) => <Request method={req.method} path={req.path} body={req.body} status={req.status}/>);

        return (
                <td>
                <h1>{this.props.name}</h1>
                <button onClick={this.request_click}>Request</button>
                <CannedResponse response={this.props.canned_response} path={this.props.path}/>
                <ul>{requests}</ul>
                </td>
        );
    }
}


export default Endpoint;
