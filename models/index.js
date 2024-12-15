const Sequelize = require('sequelize');
const config = require('../config.json');

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });

  const Turtle = require('./turtle')(Sequelize, sequelize);
  const Weapon = require('./weapon')(Sequelize, sequelize);
  const Pizza = require('./pizza')(Sequelize, sequelize);

  Turtle.hasMany(Weapon, { foreignKey: 'turtleId' });
  Weapon.belongsTo(Turtle, { foreignKey: 'turtleId' });

  return {
    Turtle,
    Weapon,
    Pizza,
    sequelize,
    Sequelize
  };
};
