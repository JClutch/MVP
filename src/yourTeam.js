import React, { Component } from 'react';

var axios = require('Axios')

class yourTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      logo: undefined,
      teams: [],
      myTeam: '',
      roster: [],
      flag: false
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
  	console.log("CHANGING TEAMS", event.target.value)
  	console.log("MYYY RASTAAAA", this.state.roster)
    this.setState({myTeam: event.target.value, flag: true});
    //setState should be async
    console.log(this.state.myTeam)
  }

  componentDidUpdate(){
  	if(this.state.myTeam !== '' && this.state.roster.length === 0){
  	  axios.post('/myTeam',{myTeam: this.state.myTeam}).then((response)=>{this.setState({roster:response.data})})
    } else if(this.state.flag){
    	axios.post('/myTeam',{myTeam: this.state.myTeam}).then((response)=>{this.setState({roster:response.data, flag:false})})
    }
  }

  componentDidMount(){
  	if(this.state.myTeam === ''){
  	    this.league()
  	}
    
  }

  render(){
  	if(this.state.teams.length === 0){return null}
  	else{

  	return(
  		<div id="all">
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

  		<div id="RASTA" style={{float:'right',width:'40%'}}>
  		{this.state.roster.map((foo, key)=>{
  			var string = ""+foo.player.JerseyNumber+ ' | ' + foo.player.FirstName+" "+foo.player.LastName+" | "+foo.player.Height+" | "+foo.player.Position+" | "+foo.player.Weight
  			return(<div key={key}>{`${string}`}</div>)
  		}

  			)}
  		</div>
  		</div>

  		)
    }
  }
}

export default yourTeam;
//   <select>
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>