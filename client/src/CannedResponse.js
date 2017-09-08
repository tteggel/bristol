import React, { Component } from "react";

class CannedResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.response.status
        };
        this.set_canned_response = this.set_canned_response.bind(this);
        this.canned_response_changed = this.canned_response_changed.bind(this);
    }

    canned_response_changed(event) {
        this.setState({status: event.target.value});
    }

    set_canned_response(event) {
        fetch("/control" + this.props.path,
              { method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    { status: this.state.status,
                      body:""})});
    }

    render() {
        return (
            <div>
                <input type="number" value={this.state.status} onChange={this.canned_response_changed}/>
                <button onClick={this.set_canned_response}>set</button>
            </div>
        );
    }
}

export default CannedResponse;
