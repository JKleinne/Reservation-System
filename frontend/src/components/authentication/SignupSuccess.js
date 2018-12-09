import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/navigation.css'
import Navigation from '../Navigation';
import {Redirect} from "react-router-dom";
import Style from "radium/es/components/style";

let _this;
class SignupSuccess extends Component {
    constructor(props) {
        super(props);

        _this = this;

        this.state = {};

        this.handleClick.bind(this);
    }

    handleClick() {
        _this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/"/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">
                            Email confirmation link sent!
                        </div>

                        <a className="bttn" onClick={this.handleClick}>Go back</a>
                    </div>
                </div>
            );
        }
    }
}

export default SignupSuccess;
