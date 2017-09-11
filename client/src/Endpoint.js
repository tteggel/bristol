import React, { Component } from 'react';
import Request from './Request';
import CannedResponse from './CannedResponse';

class Endpoint extends Component {

    render() {
        const requests = this.props.requests.map((req) => <Request key={req.timestamp} request={req} />);

        return (
                <td>
                <h1>{this.props.name}</h1>
                <h6>{this.props.path}</h6>
                <CannedResponse key={this.props.id} id={this.props.id} response={this.props.canned_response} path={this.props.path} method={this.props.method}/>
                <ul className="requests">{requests}</ul>
                </td>
        );
    }
}


export default Endpoint;
