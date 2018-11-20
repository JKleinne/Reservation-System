import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/login-signup.css';
import { Style } from 'radium';
import _ from 'lodash';

const containerStyle = {
    background: '#ED2553'
};

const textWhite = {
    color: 'white'
};

const visible = {
    display: 'block'
};

const hidden = {
    display: 'none'
};

class LoginRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerClicked : false,
            login: {
                id: '',
                password: ''
            },
            signup: {
                id: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                confirmPasswordValid: true
            }
        }
    }

    async validateForm() {
        let fName = _.toLower(this.state.signup.firstName);
        let lName = _.toLower(this.state.signup.lastName);

        //Compare if passwords match
        if(_.isEqual(this.state.signup.password, this.state.signup.confirmPassword)) {
            await this.setState({signup: {confirmPasswordValid: true}});

            if(!this.state.registerClicked)
                await axios.post("/users/login", {
                    id: this.state.signup.id,
                    password: this.state.signup.password
                });
            else
                //TODO signup payload
                await axios.post("/users/signup", {
                    id: this.state.signup.id,
                    password: this.state.signup.password
                });
        }
        else {
            this.setState({signup: {confirmPasswordValid: false}})
        }
    }

    toggleRegister() {
        this.setState({registerClicked: !this.state.registerClicked})
    }

  render() {
    return (
        <div className="materialContainer">
            <div className="box" style={this.state.registerClicked ? containerStyle : {}}>

                { this.state.registerClicked ?
                    <Style scopeSelector=".input" rules={{
                    '::-webkit-input-placeholder': {
                        color: 'white'
                    }}}/>
                    : ""
                }
                <div className="title" style={this.state.registerClicked ? textWhite : {}}>
                    {this.state.registerClicked ? "REGISTER" : "LOGIN"}
                    </div>

                <div className="input">
                    <input type="text" style={this.state.registerClicked ? textWhite : {}}
                           placeholder="Username" name="name" id="name" onChange={evt => {
                               if(this.state.registerClicked)
                                   this.setState({signup: {id: evt.target.value}});
                               else
                                   this.setState({login: {id: evt.target.value}});
                    }}/>
                </div>

                <div className="input" style={this.state.registerClicked ? visible : hidden}>
                    <input type="email" style={this.state.registerClicked ? textWhite : {}}
                           placeholder="Email" name="email" id="email" onChange={evt => {
                        this.setState({signup: {email: evt.target.value}});
                    }}/>
                </div>

                <div className="input" style={this.state.registerClicked ? visible : hidden}>
                    <input type="password" style={this.state.registerClicked ? textWhite : {}}
                           placeholder="Password" name="pass" id="pass" onChange={evt => {
                               if(this.state.registerClicked)
                                   this.setState({signup: {password: evt.target.value}});
                               else
                                   this.setState({login: {password: evt.target.value}});
                    }}/>
                    { !this.state.signup.confirmPasswordValid ?
                        <p style={{color: 'white'}}>
                            Passwords must match
                        </p> : ""}
                </div>

                <div className="input">
                    <input type="password" style={this.state.registerClicked ? textWhite : {}}
                           placeholder="Confirm Password" name="repass" id="repass" onChange={evt => {
                        this.setState({login: {password: evt.target.value}});
                    }}/>
                    { !this.state.signup.confirmPasswordValid ?
                        <p style={{color: 'white'}}>
                        Passwords must match
                    </p> : ""}
                </div>

                <div className="button login">
                    <button className={""} onClick={async () => {
                        await this.validateForm()
                    }}>
                        <span className="btn" style={this.state.registerClicked ? textWhite : {}}>Go</span>
                        <i className="fa fa-check"></i>
                    </button>
                </div>

                <a href="" className="pass-forgot">Forgot your password?</a>

            </div>

            <div className="overbox">
                <div className="material-button alt-2"><span className="shape" onClick={() => {
                    this.toggleRegister()
                }}>
                </span></div>
    </div>

  </div>
    );
  }
}

export default LoginRegister;
