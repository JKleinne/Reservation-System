import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from "./Navigation";
import '../stylesheets/navigation.css';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import randomColor from 'randomcolor';

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
        this.generateDemographicsLabels.bind(this);
        this.generateDemographicsData.bind(this);
        this.generateRandomColors.bind(this);
    }

    async componentDidMount() {
        this.setState({
            labels: this.generateLabels(),
            data: await this.generateData(),
            demoLabels: await this.generateDemographicsLabels(),
            demoData: await this.generateDemographicsData(),
            demoColors: await this.generateRandomColors()
        });
    }

    generateLabels() {
        let labels = [];

        for(let i = 7; i >= 0; i--) {
            labels.push(moment().subtract(i, 'd').format('L'))
        }

        return labels;
    }

    async generateDemographicsLabels() {
        let courses = await axios.get('/users/getCourseDemographics');
        courses = courses.data.demographics;

       return _.map(courses, course => course.Description);
    }

    async generateData() {
        let logins = [];

        for(let i = 7; i >= 0; i--) {
            let result = await axios.post(`/users/getLoginsByDate/${moment().subtract(i, 'd').format('YYYY-MM-DD')}`);
            logins.push(result.data.logins[0].Count);
        }

        return logins;
    }

    async generateDemographicsData() {
        let courses = await axios.get('/users/getCourseDemographics');
        courses = courses.data.demographics;

        return _.map(courses, course => course.Count);
    }

    async generateRandomColors() {
        let colors = [];

        let courses = await axios.get('/users/getCourseDemographics');
        courses = courses.data.demographics;

        for(let i = 0; i < courses.length; i++)
            colors.push(randomColor());

        return colors;
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
                    <div></div>

                    <Pie data={{
                        labels: this.state.demoLabels,
                        datasets: [{
                            label: "Course Demographics",
                            backgroundColor: this.state.demoColors,
                            borderColor: 'rgb(255, 99, 132)',
                            data: this.state.demoData
                        }],
                        options: {
                            title: {
                                display: true,
                                text: 'Course Demographics'
                            }
                        }
                    }}/>
                </div>
            </div>
        )
    }
}

export default Analytics;