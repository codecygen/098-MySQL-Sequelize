const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

const UserMotto = sequelize.define("user-motto", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = UserMotto;
