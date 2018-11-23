import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
//import './stylesheets/index.css';
import registerServiceWorker from './registerServiceWorker';

import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginRegister} />
            <Route path="/dashboard/:studentId" component={Dashboard} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
