import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/tables.css';
import '../../stylesheets/profile-buttons.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changes: {}
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        const user = await axios.get(`/users/getUser/${this.props.match.params.studentId}`);
        this.setState({ user: user.data.user });
    }

    async handleDelete() {
        const adminId = prompt("Enter your id: ");
        const userKey = prompt("Enter your 2fa key: ");

        const response = await axios.post(`/admins/twofactor/verify/${adminId}/${userKey}`);
        const verified = response.data.verified;

        if(verified) {
            this.setState({...this.state, redirectTo: '/users'});
            await axios.delete(`/users/deleteStudent/${this.state.user.studentId}`);
        }
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

                            <div className="input">
                                <label className="label">Student Id</label>
                                <input type="text" maxLength="7"
                                       name="studentId" id="studentId"
                                       placeholder={this.state.user ? this.state.user.studentId : ''}
                                       onChange={evt => {
                                           this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   studentId: evt.target.value
                                               }
                                           })
                                       }}/>
                            </div>

                            <div className="input">
                                <label className="label">Name</label>
                                <input type="text"
                                       name="name" id="name"
                                       placeholder={this.state.user ? this.state.user.name : ''}
                                       onChange={evt => {
                                           this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   name: evt.target.value
                                               }
                                           })
                                       }}/>
                            </div>

                            <div className="input">
                                <label className="label">Course: </label>
                                <select className="profile" onLoad={evt => {
                                    this.setState({
                                        user: {
                                            ...this.state.user,
                                            courseId: `${this.state.user.courseId}`
                                        }
                                    });
                                }}
                                        onChange={evt => {
                                            this.setState({
                                                user: {
                                                    ...this.state.user,
                                                    courseId: evt.target.value
                                                }
                                            });
                                        }}>
                                    <option value="0" selected={this.state. user && this.state.user.courseId == "0" ? 'selected' : ''}>
                                        Computer Science Technology
                                    </option>
                                    <option value="1" selected={this.state. user && this.state.user.courseId == "1" ? 'selected' : ''}>
                                        Computer Science And Mathematics
                                    </option>
                                    <option value="2" selected={this.state. user && this.state.user.courseId == "2" ? 'selected' : ''}>
                                        Social Science
                                    </option>
                                    <option value="3" selected={this.state. user && this.state.user.courseId == "3" ? 'selected' : ''}>
                                        Pure and Applied Science
                                    </option>
                                    <option value="4" selected={this.state. user && this.state.user.courseId == "4" ? 'selected' : ''}>
                                        Commerce
                                    </option>
                                    <option value="5" selected={this.state. user && this.state.user.courseId == "5" ? 'selected' : ''}>
                                        Communications
                                    </option>
                                    <option value="6" selected={this.state. user && this.state.user.courseId == "6" ? 'selected' : ''}>
                                        Business Administration
                                    </option>
                                    <option value="7" selected={this.state. user && this.state.user.courseId == "7" ? 'selected' : ''}>
                                        Early Childhood education
                                    </option>
                                    <option value="8" selected={this.state. user && this.state.user.courseId == "8" ? 'selected' : ''}>
                                        Nursing
                                    </option>
                                    <option value="9" selected={this.state. user && this.state.user.courseId == "9" ? 'selected' : ''}>
                                        Music
                                    </option>
                                    <option value="10" selected={this.state. user && this.state.user.courseId == "10" ? 'selected' : ''}>
                                        Science
                                    </option>
                                </select>
                            </div>

                            <div>
                                <a className="bttn" onClick={async () => {
                                    this.setState({...this.state, redirectTo: '/users'});
                                    await axios.post(`/users/updateStudent/${this.state.user.studentId}`, {user: this.state.user});
                                }}>Save Changes</a>
                            </div>
                            <div>
                                <a className="bttn-dark" onClick={this.handleDelete}>Delete User</a>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Profile;