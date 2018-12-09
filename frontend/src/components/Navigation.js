import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.logoutClicked = () => this.setState({ redirectTo: '/' });
        this.dashboardClicked = () => this.setState({ redirectTo: '/dashboard' });
        this.analyticsClicked = () => this.setState({ redirectTo: '/analytics' });
        this.usersClicked = () => this.setState({ redirectTo: '/users' });
        this.adminsClicked = () => this.setState({ redirectTo: '/admins' });
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    <div className="area"></div>
                    <nav className="main-menu">
                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-home fa-2x"></i>
                                    <span className="nav-text" onClick={this.dashboardClicked}>
                            Dashboard
                        </span>
                                </a>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-bar-chart-o fa-2x"></i>
                                    <span className="nav-text" onClick={this.analyticsClicked}>
                            Analytics
                        </span>
                                </a>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-user fa-2x"></i>
                                    <span className="nav-text" onClick={this.usersClicked}>
                            Users
                        </span>
                                </a>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-user-md fa-2x"></i>
                                    <span className="nav-text" onClick={this.adminsClicked}>
                            Admins
                        </span>
                                </a>
                            </li>
                        </ul>

                        <ul className="logout">
                            <li>
                                <a>
                                    <i className="fa fa-power-off fa-2x"></i>
                                    <span className="nav-text" onClick={this.logoutClicked}>
                            Logout
                        </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }
    }
}

export default Navigation;