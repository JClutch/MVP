import React, { Component } from 'react';
import yourplayer from './youplayer.js';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

var axios = require('Axios')

class yourTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      logo: undefined,
      teams: [],
      myTeam: '',
      roster: [],
      flag: false,
      schedule: [],
      standing: {wins: 0, losses: 0, rank: 0}
    }
    this.league = this.league.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  league(){
  	axios.get('/team').then((response) => {
  		this.setState({
  			teams: response
  		})
  	})

  }

  handleChange(event) {
  	console.log("MYYY RASTAAAA", this.state.roster)
    this.setState({myTeam: event.target.value, flag: true});
    //setState should be async
  }

  componentDidUpdate(){
  	if(this.state.myTeam !== '' && this.state.roster.length === 0){
  	  axios.post('/myTeam',{myTeam: this.state.myTeam}).then((response)=>{
  	  	console.log('RESSSSPONSEEE', response.data[2]);
  	  	this.setState({roster:response.data[0], flag:false, schedule:response.data[1], standing:response.data[2]})})
    } else if(this.state.flag){
    	axios.post('/myTeam',{myTeam: this.state.myTeam}).then((response)=>{
    		console.log("RESPPONSEEE", response.data[2]);
    		this.setState({roster:response.data[0], flag:false, schedule:response.data[1], standing:response.data[2]})})
    }
  }

  componentDidMount(){
  	console.log('unmounting')
  	if(this.state.myTeam === ''){
  	    this.league()
  	}
    
  }

  render(){
  	if(this.state.teams.length === 0){return null}
  	else{

  	return(


  		<div id="all" style={{width:'90%',margin:'auto 0%'}}>
  		<div style={{width:"25%",margin:"0% auto"}}>
  		<select value={this.state.myTeam} onChange={this.handleChange}>

  	{
  		this.state.teams.data.map((team, key)=>{
  			name = ''+team.team.City + ' ' + team.team.Name
  			return(<option value={name} key={key}>{`${name}`}</option>)
  		})
  	}
  	    </select>
  		</div>
  		<Router>
  		<div id="RASTA" style={{float:'right',width:'35%'}}>
  		YOUR TEAMS ROSTER
  		<ul>
  		{this.state.roster.map((foo, key)=>{
  			var string = ""+foo.player.JerseyNumber+ ' | ' + foo.player.FirstName+" "+foo.player.LastName+" | "+foo.player.Height+" | "+foo.player.Position+" | "+foo.player.Weight
  			var val = ""+foo.player.FirstName+"-"+foo.player.LastName
  			var key = key
  			return(
  				<Link to={{pathname:"/yourplayer/"+val, player:val}}><div key={key}>{`${string}`}</div>
  				</Link>
  				)
  		}

  			)}
  		</ul>
  		// <Route path="/yourplayer" component={yourplayer}/>
  		</div>
  		</Router>

  		<div id="schedule" style={{float:'left',width:'35%'}}>
  		YOUR TEAMS SCHEDULE
  		{this.state.schedule.map((foo, key)=>{
  			return(<div key={key}>
  				  		<p>
  		{foo.homeTeam.City} {foo.homeTeam.Name} vs. {foo.awayTeam.City} {foo.awayTeam.Name} <br></br>
  		{foo.time} | {foo.location} | {foo.date}
  		</p>
  				</div>)
  		}

  			)}
  		</div>

  		<div id="standing" style={{margin:'0% auto',width:'25%'}}>
  		<p style={{textAlign:'center'}}>
  		Wins - Losses <br></br>
  		{this.state.standing.wins} - {this.state.standing.losses} <br></br>
  		Overall Ranking <br></br>
  		{this.state.standing.rank}
  		</p>
  		</div>




  		</div>

  		)
    }
  }
}

export default yourTeam;


//<Link to={{ pathname: '/foo', query: { the: 'query' } }}/>