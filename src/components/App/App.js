import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Home}  />
        <Route path="/Details" component={Details} />
        <Route path="/Edit" component={Edit} />
      </div>
      </Router>
    );
  }
}

export default App;