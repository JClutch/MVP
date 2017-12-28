const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const body = require('body-parser')
const axios = require('axios')
const db = require("./db/index.js")
const compiler = webpack(webpackConfig);
var authorize = require('./src/config.js')
app.use(body.json())
app.use(express.static(__dirname + '/www'));


app.post('/player', function(req, res){
  console.log("INSIDE PLAAYYYERR SERVER!!!", req.body.player)
  axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/cumulative_player_stats.json?player='+req.body.player, authorize).then((data)=> res.json(data.data.cumulativeplayerstats.playerstatsentry))
})

app.get('/team', function(req, res){
  axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/overall_team_standings.json?teamstats=W,L', authorize).then((response) => {

    response.data.overallteamstandings.teamstandingsentry.forEach((entry)=>{
      db.Teams.findOrCreate({where:{name:entry.team.Name, city:entry.team.City, wins:entry.stats.Wins["#text"], losses:entry.stats.Losses["#text"], rank:entry.rank}}).spread((Teams, created) => {
        console.log(Teams.get({
          plain: true
        }))
      })
    })
    res.json(response.data.overallteamstandings.teamstandingsentry)

  })  
})

app.post('/myTeam', function(req, res){
  console.log('recieved request')
  var teamName = req.body.myTeam
  var maCity = ''
  if(teamName === "Portland Trail Blazers"){
    //FUCK RIP-CITY for making me hardcode them >.>
    teamName = 'portland-trailblazers'
    maCity = 'Portland'
  } else{
  teamName = teamName.toLowerCase().split(' ')
  if(teamName.length===2){
    maCity = teamName[0]
    teamName = teamName.join('-')
  } else{
    maCity = teamName[0]+" "+teamName[1]
    teamName = teamName[0]+teamName[1]+'-'+teamName[2]

  }
}
  function capitalizeCity(string) {
  if(string.indexOf(" ") === -1){
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else{
    var br = string.indexOf(" ")
    return string.charAt(0).toUpperCase() + string.slice(1, br) + string.charAt(br).toUpperCase() + string.slice(br+1)
  }
}

  maCity = capitalizeCity(maCity)




  var roster = function(){
    return axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/roster_players.json?team='+teamName, authorize)

  }
  var schedule = function(){
    return axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/full_game_schedule.json?team='+teamName+'&date=since-today', authorize)
  }
  console.log("JUST BEFORE DB", maCity)




  db.Teams.findOne({where:{city:maCity}}).then((stand)=> {
    console.log('DB WORKED', stand)

    axios.all([roster(),schedule()]).then((response)=>{
      console.log('inside AXIOS.ALL')
      var kanye = []
      kanye.push(response[0].data.rosterplayers.playerentry)
      kanye.push(response[1].data.fullgameschedule.gameentry)
      kanye.push(stand.dataValues)
      res.json(kanye)
    })
  })
})

app.get('/today', function(req, res){
  //get todays date here...
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January = 0
  var yyyy = today.getFullYear();

  if(dd<10) { 
    dd = '0'+dd
  } 

  if(mm<10) {
    mm = '0'+mm
  } 
  today = ""+ yyyy + mm + dd;
  axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/daily_game_schedule.json?fordate='+today, authorize).then((response) => {

    res.json(response.data.dailygameschedule.gameentry);
    //res.status(200).end(response.data.dailygameschedule.gameentry)
  })  
})

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.set('port', process.env.PORT || 3000)
 
const server = app.listen(app.get('port'))