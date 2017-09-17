import React, { Component } from 'react';
import './Request.css';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            timestamp: 0
        };
        this.header_click = this.header_click.bind(this);
        this.update_date = this.update_date.bind(this);
    }

    componentDidMount() {
        this._timer = setInterval(this.update_date, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    update_date() {
        this.setState({timestamp: Math.floor((Date.now() - this.props.request.timestamp) / 1000)});
    }

    header_click() {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        return <li className={this.props.request.response.status.toString().startsWith("2") ? "ok" : "error"}
        onClick={this.header_click}>
            {this.props.request.method.toUpperCase()} {this.props.path} {this.props.status}
            <div className={this.state.collapsed ? "hidden" : ""}>
                <span className="timestamp">{this.state.timestamp}s ago</span>
                <ul>
                <li><b>Request Body:</b>{JSON.stringify(this.props.request.body, null, '\t')}</li>
            <li><b>Response Body:</b>{JSON.stringify(this.props.request.response.body, null, '\t')}</li> </ul>
            </div>
        </li>;
    }
}

export default Request;
