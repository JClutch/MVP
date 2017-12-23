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
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/yourteam">Your Team</Link></li>
        <li><Link to="/yourplayer">Player</Link></li>

      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/yourteam" component={yourTeam}/>
      <Route path="/yourplayer" component={yourplayer}/>
    </div>
  </Router>
)

export default MyRoute