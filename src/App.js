import React, { Component } from 'react';
import Today from './nav.js'
var axios = require('Axios')
var authorize = require('./config.js')


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todayGames: []
    }
    this.today = this.today.bind(this)
  }


  today(){
   axios.get('/today').then((response) => {
    console.log(response.data);
    this.setState({
      todayGames: response.data
    })
  })

  }

  componentDidMount(){
    this.today()
  }

  render() {

    // /season/feed.json
    //axios.get('/team').then((response) => console.log("Heya", response))

      return (
        <div style={{textAlign:'center'}}>
        
        <img src={require("./locker-room-logo.png")} id="logo" style={{margin:'auto', height:'auto', width:'30%'}}/>
          <div className="row">
            <div id="today">
              <Today Games={this.state.todayGames} />
            </div>
            <div className="slide-menu">
              Slide Out Menu
            </div>
          </div>
        </div>
      );
    }
}


export default App;