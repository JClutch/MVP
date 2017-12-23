import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './home.js'
import yourTeam from './yourTeam.js'
import yourplayer from './youplayer.js';

const MyRoute = () => (
  <Router>
    <div>
      <ul style={{backgroundColor:'rgba(230, 126, 34, .90)'}}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/yourteam">Your Team</Link></li>

      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/yourteam" component={yourTeam}/>
      <Route path="/yourplayer/:id" component={yourplayer}/>
    </div>
  </Router>
)

export default MyRoute