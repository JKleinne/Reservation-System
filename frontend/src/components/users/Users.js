import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import axios from 'axios';
import UsersTable from './UsersTable';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        const users = await axios.get('/users/getUsers');
        this.setState({ users: users.data.users });
    }

    render() {
        return (
            <div>
               <Navigation />

                <div className="calendarContainer">
                    <UsersTable />
                </div>
            </div>
        )
    }
}

export default Users;