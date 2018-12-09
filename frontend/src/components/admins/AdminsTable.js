import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/tables.css';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";
import print from 'print-js'

let _this;
class AdminsTable extends Component {
    constructor(props) {
        super(props);

        _this = this;

        this.state = {};

        this.handleTableDownloadClick.bind(this);
    }

    async componentDidMount() {
        const users = await axios.get('/admins/getAdmins');
        this.setState({ admins: users.data.admins });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const users = await axios.get('/admins/getAdmins');
        this.setState({ admins: users.data.admins });
    }

    handleTableDownloadClick() {
        print({
            printable: _this.state.admins,
            type: 'json',
            properties: ['id', 'name']
        });
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    {
                        this.state.admins ?
                            <a className="bttn-dark print" onClick={this.handleTableDownloadClick}>Print</a>
                            : ''
                    }
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.admins ?
                            _.map(this.state.admins, admin => {
                                return (
                                    <tr>
                                        <td>{admin.id}</td>
                                        <td>{admin.name}</td>
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

export default AdminsTable;