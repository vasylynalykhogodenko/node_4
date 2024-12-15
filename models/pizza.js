module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pizza', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calories: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
};
