import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from "./Navigation";
import '../stylesheets/navigation.css';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.generateLabels.bind(this);
        this.generateData.bind(this);
    }

    async componentDidMount() {
        this.setState({
            labels: this.generateLabels(),
            data: await this.generateData()
        });
    }

    generateLabels() {
        let labels = [];

        for(let i = 7; i >= 0; i--) {
            labels.push(moment().subtract(i, 'd').format('L'))
        }

        return labels;
    }

    async generateData() {
        let logins = [];

        for(let i = 7; i >= 0; i--) {
            let result = await axios.post(`/users/getLoginsByDate/${moment().subtract(i, 'd').format('YYYY-MM-DD')}`);
            logins.push(result.data.logins[0].Count);
        }

        console.log(logins);

        return logins;
    }

    render() {
        return (
            <div>
                <Navigation />

                <div className="calendarContainer">
                    <Bar data={{
                        labels: this.state.labels,
                        datasets: [{
                            label: "Logins",
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: this.state.data,
                        }]
                    }}
                    options={{
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }]
                        }
                    }
                    }/>
                </div>
            </div>
        )
    }
}

export default Analytics;