module.exports = (Sequelize, sequelize) => {
  return sequelize.define('weapons', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dps: {
      type: Sequelize.INTEGER
    }
  });
};
