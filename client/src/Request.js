import React, { Component } from 'react';

class Request extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <li>{this.props.method.toUpperCase()} {this.props.path}</li>;
    }
}

export default Request;
