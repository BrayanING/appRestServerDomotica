const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbDomotica', 'root', 'informatic0', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

var model = {};
model.sequelize = sequelize;

model.User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  image: Sequelize.TEXT('long'),
  status: Sequelize.BOOLEAN
}, {
  freezeTableName: true,
});

model.Device = sequelize.define('device', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  status: Sequelize.BOOLEAN
}, {
  freezeTableName: true,
});

var reset = false;
	sequelize
		.sync({ force: reset })
		.then(function(err) {
			err = err;
			console.log('It worked!');
			//DEFAULTS
			if (reset) {
				// nothing
				console.log('hi');
			}
		}, function(err) {
			console.log('An error occurred while creating the table:', err);
    });

module.exports = {
  model
}
