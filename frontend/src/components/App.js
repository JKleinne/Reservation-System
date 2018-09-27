import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../stylesheets/App.css';
import Login from './Login';

class App extends Component {
    /* Example of how to call the backend */

    // async componentDidMount() {
    //     try {
    //         await axios.get('/users/');
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hi</h1>
        </header>
        <p className="App-intro">
          <code>Hello There</code>
        </p>

        <Login/>
      </div>
    );
  }
}

export default App;
