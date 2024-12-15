const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);


db.sequelize.sync()
  .then(() => {
    db.Turtle.create({
      name: 'Leonardo',
      age: 15
    })
      .then(turtle => {
        console.log('Turtle created:', turtle.toJSON());
      })
      .catch(err => {
        console.error('Error creating turtle:', err);
      });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  }
);

