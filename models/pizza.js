module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pizza', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      toppings: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
};
