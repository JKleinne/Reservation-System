import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/tables.css';
import '../../stylesheets/profile-buttons.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class AdminProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        const response = await axios.post(`/admins/addAdmin/${this.state.id}/${this.state.name}/${this.state.password}`);
        this.setState({...this.state, redirectTo: `/qrcode/${response.data.qrCode}`});
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect push to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    <Navigation/>

                    <div className="materialContainer">
                        <div className="box">
                            <div className="title">
                                ADMIN CREATION
                            </div>

                            <div className="input">
                                <input type="text" maxLength="7"
                                       placeholder="Id" name="adminId" id="adminId" onChange={evt => {
                                    this.setState({
                                        ...this.state,
                                        id: evt.target.value
                                    })
                                }}/>
                            </div>

                            <div className="input">
                                <input type="text"
                                       placeholder="Name" name="name" id="name" onChange={evt => {
                                    this.setState({
                                        ...this.state,
                                        name: evt.target.value
                                    })
                                }}/>
                            </div>

                            <div className="input">
                                <input type="password"
                                       placeholder="Password" name="password" id="password" onChange={evt => {
                                    this.setState({
                                        ...this.state,
                                        password: evt.target.value
                                    })
                                }}/>
                            </div>

                            <a className="bttn" onClick={this.handleClick}>Create Admin</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AdminProfile;