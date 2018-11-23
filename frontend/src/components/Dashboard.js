import React, { Component } from 'react';
import axios from 'axios';
import Calendar from './Calendar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let response = await axios.get(`/users/getUser/${this.props.match.params.studentId}`);
        this.setState({ user: response.data.user });
    }

    render() {
        return (
            <div className="calendarContainer">
              <Calendar />
            </div>
        );
    }
}

export default Dashboard;
