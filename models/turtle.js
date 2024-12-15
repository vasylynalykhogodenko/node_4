module.exports = (Sequelize, sequelize) => {
    return sequelize.define('turtle', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      weaponId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      firstFavoritePizzaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pizza',
          key: 'id'
        }
      },
      secondFavoritePizzaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pizza',
          key: 'id'
        }
      },
    });
};
