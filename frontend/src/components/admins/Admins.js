import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import axios from 'axios';
import AdminsTable from './AdminsTable';
import { Redirect } from "react-router-dom";

class Admins extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const users = await axios.get('/users/getUsers');
        this.setState({ users: users.data.users });
    }

    handleClick() {
        this.setState({ redirectTo: '/adminProfile'});
    }

    render() {
        if(this.state.redirectTo)
            return <Redirect to={{ pathname: this.state.redirectTo }}/>

        else {
            return (
                <div>
                    <Navigation/>

                    <div className="calendarContainer">
                        <a className="bttn-dark print" onClick={this.handleClick}>Create an admin</a>
                        <AdminsTable/>
                    </div>
                </div>
            )
        }
    }
}

export default Admins;