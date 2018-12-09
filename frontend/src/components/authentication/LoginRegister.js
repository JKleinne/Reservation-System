import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/login-signup.css';
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
                fullName: '',
                courseId: '',
                confirmPasswordValid: true
            }
        }

        this.idRef = React.createRef();
        this.pwRef = React.createRef();
    }

    async validateForm(evt) {
        evt.preventDefault();

        //Compare if passwords match
        if(_.isEqual(this.state.signup.password, this.state.signup.confirmPassword)) {
            await this.setState({
                ...this.state,
                signup: {
                    ...this.state.signup,
                    confirmPasswordValid: true
                }
            });

            if(!this.state.registerClicked) {
                let response;

                try {
                    response = await axios.post("/admins/login", {...this.state.login});
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200)
                    this.setState({redirectTo: '/dashboard'});
                else
                    this.setState({ ...this.state, errorLogin: response.data.error })
            }
            else {
                let response;

                try {
                    response = await axios.post("/users/signup", {...this.state.signup});
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200)
                    this.setState({redirectTo: '/signupSuccess'});
                else
                    this.setState({ ...this.state, errorLogin: response.data.error });
            }
        }
        else {
            this.setState({
                ...this.state,
                signup: {
                    ...this.state.signup,
                    confirmPasswordValid: false
                }
            })
        }
    }

    toggleRegister() {
        this.idRef.current.value = '';
        this.pwRef.current.value = '';

        this.setState({
            registerClicked: !this.state.registerClicked
        })
    }

  render() {
      const handleRegisterClick = () => {
          this.toggleRegister();
      };

      if (this.state.redirectTo)
          return <Redirect push to={{ pathname: this.state.redirectTo }}/>;
      else {
          return (
              <div className="materialContainer">
                  <div className="box" style={this.state.registerClicked ? containerStyle : {}}>

                      {this.state.registerClicked ?
                          <Style scopeSelector=".input" rules={{
                              '::-webkit-input-placeholder': {
                                  color: 'white'
                              }
                          }}/>
                          : ""
                      }

                      <div className="title" style={this.state.registerClicked ? textWhite : {}}>
                          {this.state.registerClicked ? "REGISTER" : "LOGIN"}
                      </div>

                      <div className="input">
                          <input type="text" maxLength="7" ref={this.idRef}
                                 style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Student Id" name="studentId" id="studentId" onChange={evt => {
                              if (this.state.registerClicked)
                                  this.setState({
                                      ...this.state,
                                      signup: {
                                          ...this.state.signup,
                                          id: evt.target.value
                                      }
                                  });
                              else
                                  this.setState({
                                      ...this.state,
                                      login: {
                                          ...this.state.login,
                                          id: evt.target.value
                                      }
                                  });
                          }}/>
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <input type="text" style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Full Name" name="fullName" id="fullName" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      fullName: evt.target.value
                                  }
                              });
                          }}/>
                      </div>


                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <label style={{color: 'white'}}>Course: </label>
                          <select style={this.state.registerClicked ? {float: 'right'} : {}}
                                  name="course" id="course" onLoad={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      courseId: "0"
                                  }
                              });
                          }}
                                  onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      courseId: evt.target.value
                                  }
                              });
                          }}>
                              <option value="0">Computer Science Technology</option>
                              <option value="1">Social Science</option>
                              <option value="2">Commerce</option>
                              <option value="3">Industrial Electronics</option>
                              <option value="4">Liberal Arts</option>
                              <option value="5">Communications</option>
                              <option value="6">Business Administration</option>
                              <option value="7">Early Childhood education</option>
                              <option value="8">Nursing</option>
                              <option value="9">Music</option>
                              <option value="10">Science</option>
                          </select>
                      </div>

                      <div className="input">
                          <input type="password" style={this.state.registerClicked ? textWhite : {}}
                                 ref={this.pwRef}
                                 placeholder="Password" name="password" id="pass" onChange={evt => {
                              if (this.state.registerClicked)
                                  this.setState({
                                      ...this.state,
                                      signup: {
                                          ...this.state.signup,
                                          password: evt.target.value
                                      }
                                  });
                              else
                                  this.setState({
                                      ...this.state,
                                      login: {
                                          ...this.state.login,
                                          password: evt.target.value
                                      }
                                  });
                          }}/>
                          {!this.state.signup.confirmPasswordValid ?
                              <p style={{color: 'white'}}>
                                  Passwords must match
                              </p> : ""}
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <input type="password" style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Confirm Password" name="repass" id="repass" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      confirmPassword: evt.target.value
                                  }
                              })
                          }}/>
                          {!this.state.signup.confirmPasswordValid ?
                              <p style={{color: 'white'}}>
                                  Passwords must match
                              </p> : ""}
                      </div>

                      <div className="button login">
                          {  !this.state.registerClicked && this.state.errorLogin ?
                              <p style={this.state.registerClicked ? {color: 'white'} : {color: '#ED2553'}}>
                                  Incorrect Login
                              </p> : ""
                          }
                          <button className={""} onClick={async evt => {
                              await this.validateForm(evt)
                          }}>
                              <span className="btn" style={this.state.registerClicked ? textWhite : {}}>Go</span>
                              <i className="fa fa-check"></i>
                          </button>
                      </div>

                      <a href="" className="pass-forgot">Forgot your password?</a>

                  </div>

                  <div className="overbox">
                      <div className="material-button alt-2"><span className="shape" onClick={handleRegisterClick}>
                </span></div>
                  </div>

              </div>
          );
      }
  }
}

export default LoginRegister;