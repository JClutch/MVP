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
  var teamName = req.body.myTeam
  if(teamName === "Portland Trail Blazers"){
    //FUCK RIP-CITY for making me hardcode them >.>
    teamName = 'portland-trailblazers'
  } else{
  teamName = teamName.toLowerCase().split(' ')
  if(teamName.length===2){
    teamName = teamName.join('-')
  } else{
    teamName = teamName[0]+teamName[1]+'-'+teamName[2]
  }
}

  var city = teamName.split('-')[0]
  

  console.log("MYYYY REQUEST", teamName)
  axios.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/roster_players.json?team='+teamName, authorize).then((response)=>{
    res.json(response.data.rosterplayers.playerentry)
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

    console.log("Heyya response today's games", response.data.dailygameschedule.gameentry);
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
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});