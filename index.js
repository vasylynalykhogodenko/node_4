const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
