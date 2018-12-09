import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/navigation.css'
import {Redirect} from "react-router-dom";
import _ from 'lodash';

class QRCode extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/admins"/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">
                            Scan the QR with Google Authenticator
                        </div>

                        <img  src={this.props.location.pathname.substr(8)}/>

                        <a className="bttn" onClick={this.handleClick}>Go back</a>
                    </div>
                </div>
            );
        }
    }
}

export default QRCode;
