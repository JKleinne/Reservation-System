import React from "react";
import dateFns from "date-fns";
import '../../stylesheets/calendar.css';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        };
    }

    async componentDidMount() {
        const monthlyBookings = await axios.post(`/bookings/getBookingsByMonth/${moment(this.state.currentMonth).month() + 1}`);
        this.setState({ monthlyBookings: monthlyBookings.data.bookings });
    }

    async componentDidUpdate() {
        const monthlyBookings = await axios.post(`/bookings/getBookingsByMonth/${moment(this.state.currentMonth).month() + 1}`);
        this.setState({ monthlyBookings: monthlyBookings.data.bookings });
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        let bookedDays = [];

        if(this.state.monthlyBookings) {
            _.forEach(this.state.monthlyBookings, booking => bookedDays.push(new Date(booking.date).getDate()))
        }


        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        {
                            bookedDays.includes(new Date(day).getDate()) ?
                                _.map(this.findBookingByDay(new Date(day).getDate()), booking => {
                                    return <span className="booking">{moment(booking.date).format('h:mmA')} - Room {booking.roomId}</span>;
                                })
                                : ''
                        }

                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    findBookingByDay = day => {
        let result = _.filter(this.state.monthlyBookings, booking => {
            return new Date(booking.date).getDate() === day;
        });

        return result;
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;