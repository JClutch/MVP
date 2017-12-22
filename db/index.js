var Sequelize = require('sequelize');
const sequelize = new Sequelize('lockerRoom','root', '', {
  host: 'localhost',
  dialect: 'mysql',
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

