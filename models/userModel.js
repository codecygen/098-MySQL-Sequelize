const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

// Commonly used data types are:
// Numeric Data Types: TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT, FLOAT, DOUBLE, DECIMAL
// String Data Types: CHAR, VARCHAR, TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT, ENUM, SET
// Date and Time Data Types: DATE, TIME, DATETIME, TIMESTAMP
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  passwoord: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: Sequelize.DataTypes.INTEGER,
    // defaultValue: 21
  },
});

module.exports = User;
