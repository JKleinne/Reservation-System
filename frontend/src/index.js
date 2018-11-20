import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './stylesheets/index.css';
import registerServiceWorker from './registerServiceWorker';

import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={LoginRegister} />
            <Route path="/home" component={Dashboard} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
