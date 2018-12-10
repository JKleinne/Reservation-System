import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/tables.css';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";
import print from 'print-js'

class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleTableDownloadClick = this.handleTableDownloadClick.bind(this);
    }

    async componentDidMount() {
        const users = await axios.get('/users/getUsers');
        this.setState({users: _.sortBy(users.data.users, 'studentId')});
    }

    async componentWillUpdate(prevProps, prevState, snapshot) {
        const users = await axios.get('/users/getUsers');
        this.setState({users: _.sortBy(users.data.users, 'studentId')});
    }

    handleTableDownloadClick() {
        print({
            printable: this.state.users,
            type: 'json',
            properties: ['studentId', 'name', 'description']
        });
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    {
                        this.state.users ?
                            <a className="bttn-dark print" onClick={this.handleTableDownloadClick}>Print</a>
                            : ''
                    }
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
                </div>
            )
        }
    }
}

export default UsersTable;