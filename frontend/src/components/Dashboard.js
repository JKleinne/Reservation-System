import React, { Component } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import '../stylesheets/navigation.css'
import Navigation from './Navigation';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const bookings = await axios.get('/bookings/getBookings');

        this.setState({
            bookings: bookings.data.bookings,
        });
    }

    render() {
            return (
                <div>
                    <Navigation studentId={this.props.match.params.studentId}/>
                    <div className="calendarContainer">
                        {
                            this.state && this.state.bookings &&
                            <Calendar bookings={this.state.bookings} />
                        }
                    </div>
                </div>
            );
        }
}

export default Dashboard;
