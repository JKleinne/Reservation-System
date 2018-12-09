import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import './stylesheets/index.css';

import LoginRegister from './components/authentication/LoginRegister';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import Users from './components/users/Users';
import Profile from './components/users/Profile';
import SignupSuccess from './components/authentication/SignupSuccess';
import Admins from './components/admins/Admins';
import AdminProfile from './components/admins/AdminProfile';
import QRCode from './components/admins/QRcode';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginRegister} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/users" component={Users} />
            <Route path="/profile/:studentId" component={Profile} />
            <Route path="/signupSuccess" component={SignupSuccess} />
            <Route path="/admins" component={Admins} />
            <Route path="/adminProfile/" component={AdminProfile} />
            <Route path="/qrcode/:imgSrc" component={QRCode} />
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
