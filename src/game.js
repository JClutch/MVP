import React, { Component } from 'react';

export default class Game extends React.Component {
  constructor(props){
    super(props)
  }

  render (){
  	console.log("INSIDE INDIV GAME", this.props.game)
  	return(
  		<div className='game'>
  		<p>
  		{this.props.game.homeTeam.City} {this.props.game.homeTeam.Name} vs. {this.props.game.awayTeam.City} {this.props.game.awayTeam.Name} <br></br>
  		{this.props.game.time} {this.props.game.location}
  		</p>
  		</div>
  		)
  }
}