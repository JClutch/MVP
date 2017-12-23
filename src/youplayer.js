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
    this.isMounted = true;
    if(!this.state.player && !this.state.flag){
      this.setplayer()
    }
  }

  componentWillUnmount() {
    this.isMounted = false; 
  }

  setplayer(){
    if(this.props.location.hasOwnProperty('player')) {
      let player = this.props.location.player
      let flag = true
      this.setState({ flag, player }, () => {
        axios.post('/player', {player : this.props.location.player})
          .then((response) => {
            console.log('the response: ', response.data[0])
            let stats = response.data[0] 
            let player = this.props.location.player
            // while (!this.isMounted) {
            //   console.log('we waiting')
            // }
            this.setState({ stats, player }, () => { console.log('this.state after data: ', this.state) }) 
          })
      })
    }
  }

  render (){
    console.log("STATE OF AFFAIRS: ", this.state)
    if (this.state.player === undefined || this.state.stats === undefined) {
      console.log("player===undefined", this.state.player, this.state.stats)
      return(null)
    } else {
      console.log("player doesnt equal undef", this.state.stats)
      return(
        <div>
          <p>
            {this.state.stats.player.LastName}
          </p>
        </div>
      )
    } 
  }
}






// import React, { Component } from 'react';
// const axios = require('axios')

// export default class Player extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       player : undefined,
//       stats: '',
//       flag: false
//     }
//     this.setplayer = this.setplayer.bind(this);
//     this.magic = this.magic.bind(this);
//   }


//   componentDidMount(){
//     console.log('plaayyyerr updated')
//     if(!this.state.player){
//     this.setplayer()
//      }
//   }

//   setplayer(){
//     // console.log('hihihihi')
//     if (this.props.location.hasOwnProperty('player') && this.state.flag !== true) {
//       // console.log(this.props.location.player)
//       let player = this.props.location.player;
//       let flag = true; 
//       this.setState ({ player , flag })
//     }

//   }

//   // shouldComponentUpdate() {
//   //   if (this.state.player === undefined) {
//   //     return false
//   //   }
//   //   return true
//   // }

//   magic(player) {
//     console.log('magic happening', player)
//     axios.post('/player', {player: player})
//       .then((response)=>{
//         console.log(response.data[0], "stats data")
//         this.setState({ 
//           player: player,
//           stats:response.data[0]
//         })
//       })
//   }

//   render (){
//     console.log(this.state.player, "each render")
//     return (
//       this.state.player !== undefined ? (
//         <div>
//           {this.state.player}
//         </div>
//         ) : 
//         (null)
//     )
//   }
// }