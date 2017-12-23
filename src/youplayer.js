import React, { Component } from 'react';
const axios = require('axios')

export default class Player extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      player : undefined,
      stats: undefined,
      flag: false
    }
    this.setplayer = this.setplayer.bind(this)
  }


  componentDidMount() {
    console.log('componentDidMount run ')
    this.state.isMounted = true;
    if(!this.state.player && !this.state.flag){
      this.setplayer()
    }
  }

  componentWillUnmount() {
    this.state.isMounted = false; 
    console.log('unmountinggggggggg')
  }

  setplayer(){
    // if(this.props.location.hasOwnProperty('player')) {
      let player = this.props.location.pathname.slice(12)
      let flag = true
      this.setState({ flag, player }, () => {
        console.log('FIRST SET STATE', this.state)
        axios.post('/player', {player : this.state.player})
          .then((response) => {
            console.log('what is this', this.state);
            console.log('the response: ', response.data[0])
            let stats = response.data[0] 
            let player = this.props.location.player
            // while (!this.isMounted) {
            //   console.log('we waiting')
            // }
            console.log('testttttinggggg', stats, player, this.state.isMounted)
            this.state.isMounted ? this.setState({ stats, player }, () => { console.log('this.state after data: ', this.state) }) : null; 
            
          })
      })
    //}
  }

  render (){
    console.log("LOOK HERE", this.props)
    if (this.state.stats === undefined) {
      console.log("player===undefined", this.state.player, this.state.stats)
      return(null)
    } else {
      console.log("player doesnt equal undef", this.state.stats)
      return(
        <div>
          <p>
           {this.state.stats.player.LastName} {this.state.stats.player.LastName} <br></br>
           PPG: {this.state.stats.stats.PtsPerGame['#text']} | APG: {this.state.stats.stats.AstPerGame['#text']} | RPG: {this.state.stats.stats.RebPerGame['#text']} | BPG: {this.state.stats.stats.BlkPerGame['#text']}<br></br>
          </p>
        </div>
      )
    } 
  }
}