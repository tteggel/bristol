import React, { Component } from "react";
import './CannedResponse.css';

class CannedResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.response.status,
            body: JSON.stringify(this.props.response.body),
            collapsed: true
        };
        this.set_canned_response = this.set_canned_response.bind(this);
        this.canned_response_body_changed = this.canned_response_body_changed.bind(this);
        this.canned_response_status_changed = this.canned_response_status_changed.bind(this);
        this.request_click = this.request_click.bind(this);
        this.header_click = this.header_click.bind(this);
    }

    request_click() {
        fetch(this.props.path, { method: this.props.method });
    }

    canned_response_status_changed(event) {
        this.setState({status: event.target.value});
    }

    canned_response_body_changed(event) {
        this.setState({body: event.target.value});
    }

    set_canned_response(event) {
        fetch("/control/" + this.props.id, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                status: this.state.status,
                body: JSON.parse(this.state.body)
            })
        });
    }

    header_click(event) {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        return (
            <div className="canned_response">
                <div className="title" onClick={this.header_click}>{this.state.collapsed ? "> " : "^ "}Canned Response</div>
                <div className={this.state.collapsed ? "hidden" : ""}>
                <label>Status Code:</label><input id="status" type="text" value={this.state.status} onChange={this.canned_response_status_changed}/>
                <textarea onChange={this.canned_response_body_changed} value={this.state.body}></textarea>
                <button type="button" className="btn btn-primary btn-sm" onClick={this.set_canned_response}>set</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={this.request_click}>test</button>
                </div>
            </div>
        );
    }
}

export default CannedResponse;
