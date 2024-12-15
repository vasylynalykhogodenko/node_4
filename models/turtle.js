module.exports = (Sequelize, sequelize) => {
    return sequelize.define('turtle', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
};
