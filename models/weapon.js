module.exports = (Sequelize, sequelize) => {
    return sequelize.define('weapon', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      damage: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
};
