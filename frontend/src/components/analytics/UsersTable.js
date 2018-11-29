import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/tables.css';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from "react-router-dom";

class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.counter = 1;
        this.previous = 0;
    }

    async componentDidMount() {
        const users = await axios.get('/users/getUsers');
        this.setState({ users: users.data.users });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const users = await axios.get('/users/getUsers');
        this.setState({users: users.data.users});
    }


    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            console.log(`Props: ${JSON.stringify(this.props, null, 2)}`);
            return (
                <table>
                    <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Name</th>
                        <th>Course</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users ?
                        _.map(this.state.users, user => {
                            return (
                                <tr onClick={() => {
                                    this.setState({redirectTo: `/profile/${user.studentId}`})
                                }}>
                                    <td>{user.studentId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.description}</td>
                                </tr>
                            )
                        })
                        : ''}
                    </tbody>
                </table>
            )
        }
    }
}

export default UsersTable;