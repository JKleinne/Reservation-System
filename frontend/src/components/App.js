import React, { Component } from 'react';
import logo from '../logo.svg';
import '../stylesheets/App.css';

class App extends Component {
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
      </div>
    );
  }
}

export default App;
