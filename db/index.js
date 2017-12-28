var Sequelize = require('sequelize');
const sequelize = new Sequelize('d3tmnlekdftp3e','vuktfwvxnakgsv', 'bf8569e1ff40265fdaedd0f78746edfe64b7bfe37eb904ec8b5c075e737c33bc', {
  host: 'ec2-23-23-245-89.compute-1.amazonaws.com',
  dialect: 'postgres' || 'mysql',
 //  dialect:  'postgres',
 // protocol: 'postgres',
 // port:     match[4],
 // host:     match[3],
 // logging: false,
 dialectOptions: {
     ssl: true
 },
  pool: {
  	max: 5,
  	min: 0,
  	idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Games = sequelize.define('games', {
	homeTeam: {
		type: Sequelize.STRING
	},
	awayTeam: {
		type: Sequelize.STRING
	},
	homeScore: {
		type: Sequelize.INTEGER
	},
	awayScore: {
		type: Sequelize.INTEGER
	}

})

Games.sync({force: false})

const Players = sequelize.define('players',{
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
})

Players.sync({force: false})

const Teams = sequelize.define('teams', {
	name: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	wins: {
		type: Sequelize.INTEGER
	},
	losses: {
		type: Sequelize.INTEGER
	},
	rank: {
		type: Sequelize.INTEGER
	}

})

Teams.sync({force: false})

module.exports = {
  sequelize: sequelize,
  Games: Games,
  Teams: Teams,
  Players: Players
}

//if i want to change a database re instantiate the app using 
// mysql -u root < schema.sql after making your changes

