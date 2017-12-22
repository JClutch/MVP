import React, { Component } from 'react';
import Game from './game.js'

export default class Nav extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div id='todaysGames'>
      Games Being Played Today
      {this.props.Games.map((foo, key)=>{
        return(
        <Game game={foo} key={key} />
        )
      })}
      </div>
    )
  }
}

// homeTeamName={game.homeTeam.Name} homeTeamCity={game.homeTeam.City} 
//         awayTeamName={game.awayTeam.Name} awayTeamCity={game.awayTeam.City}
//         time={game.time} location={game.location}