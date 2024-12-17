const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.database, config.username, config.password,
  {
    host: config.host,
    dialect: config.dialect
  });

  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  turtles.belongsTo(weapons, { foreignKey: 'weaponId' });
  turtles.belongsTo(pizzas, { as: 'firstFavoritePizza', foreignKey: 'firstFavoritePizzaId' });
  turtles.belongsTo(pizzas, { as: 'secondFavoritePizza', foreignKey: 'secondFavoritePizzaId' });

  pizzas.hasMany(turtles, { foreignKey: 'firstFavoritePizzaId', as: 'firstFavoritePizza' });
  pizzas.hasMany(turtles, { foreignKey: 'secondFavoritePizzaId', as: 'secondFavoritePizza' });

  return {
    turtles,
    weapons,
    pizzas,

    sequelize: sequelize,
    Sequelize: Sequelize,
  };
};
