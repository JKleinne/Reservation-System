import React, { Component } from 'react';
import '../stylesheets/pages/login.less';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin() {

    }

    render() {
        return(
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                        <h1>Haxors <small>Vanier College Booking System</small></h1>
                        <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid">
                            <div className="form-content">
                                <div className="form-group">
                                    <input type="text" className="form-control input-underline input-lg" placeholder="Email" onChange={evt => {
                                        this.setState({username: evt.target.value})
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control input-underline input-lg" placeholder="Password" onChange={evt => {
                                        this.setState({password: evt.target.value})
                                    }}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Login</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;