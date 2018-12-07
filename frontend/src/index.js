import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
//import { Provider as AlertProvider } from 'react-alert';

import './stylesheets/index.css';

import LoginRegister from './components/LoginRegister';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import Users from './components/analytics/Users';
import Profile from './components/analytics/Profile';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginRegister} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/users" component={Users} />
            <Route path="/profile/:studentId" component={Profile} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

/*
Homer Simpson approves of this code
▓▓▓▓
▒▒▒▓▓
▒▒▒▒▒▓
▒▒▒▒▒▒▓
▒▒▒▒▒▒▓
▒▒▒▒▒▒▒▓
▒▒▒▒▒▒▒▓▓▓
▒▓▓▓▓▓▓░░░▓
▒▓░░░░▓░░░░▓
▓░░░░░░▓░▓░▓
▓░░░░░░▓░░░▓
▓░░▓░░░▓▓▓▓
▒▓░░░░▓▒▒▒▒▓
▒▒▓▓▓▓▒▒▒▒▒▓
▒▒▒▒▒▒▒▒▓▓▓▓
▒▒▒▒▒▓▓▓▒▒▒▒▓
▒▒▒▒▓▒▒▒▒▒▒▒▒▓
▒▒▒▓▒▒▒▒▒▒▒▒▒▓
▒▒▓▒▒▒▒▒▒▒▒▒▒▒▓
▒▓▒▓▒▒▒▒▒▒▒▒▒▓
▒▓▒▓▓▓▓▓▓▓▓▓▓
▒▓▒▒▒▒▒▒▒▓
▒▒▓▒▒▒▒▒▓
 */
