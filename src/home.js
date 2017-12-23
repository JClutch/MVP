import React, { Component } from 'react';
import Today from './nav.js'

var axios = require('Axios')
var authorize = require('./config.js')


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      todayGames: []
    }
    this.today = this.today.bind(this)
  }


  today(){
   axios.get('/today').then((response) => {
    this.setState({
      todayGames: response.data
    })
  })

  }

  componentDidMount(){
    this.today()
    axios.get('/team').then(()=>console.log("database updated"))
  }

  render() {

    // /season/feed.json
    //

      return (
        <div style={{textAlign:'center',backgroundColor:"rgba(52, 73, 94, 0.75)"}}>
        
        <img src={require("./locker-room-logo.png")} id="logo" style={{margin:'auto', height:'auto', width:'30%'}}/>
          <div className="row">
            <div id="today">
              <Today Games={this.state.todayGames} />
            </div>
            <div className="slide-menu">
            <br></br>
            </div>
          </div>
        </div>
      );
    }
}


export default Home;