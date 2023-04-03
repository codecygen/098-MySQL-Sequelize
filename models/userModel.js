const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

const {
  newData,
  longPassData,
  newDataSet,
  longPassDataSet,
} = require("./dummy-data/dummyUserData");

const {
  createTableRow,
  deleteTableRowById,
  findTableRowById,
  updateTableColumnById,
  alterTableNumericValue,
  bulkCreateTableData,
  getAllTableData,
  getRawTableData,
  columTotalValue,
  aggregateColumnswithSpecificName,
  getUserOrAgewithOrOperator,
  getUserswithAgeinBetween23and40,
  findNamesWithCertainLength,
  updateNameIfAgeisMoreThan20,
  deleteEntriesWithNameWow,
  maxAge,
  totalAge,
  findByIndex,
  findOneEntry,
  findOrCreateEntry,
} = require("./dataManipulation");

// Commonly used data types are:
// Numeric Data Types: TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT, FLOAT, DOUBLE, DECIMAL
// String Data Types: CHAR, VARCHAR, TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT, ENUM, SET
// Date and Time Data Types: DATE, TIME, DATETIME, TIMESTAMP
// Boolean: BOOLEAN
const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,

      // defaultValue: "aras",
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 10],
      },

      defaultValue: "arasaras",
    },

    email: {
      type: Sequelize.DataTypes.STRING, // type: Sequelize.DataTypes.STRING(25) means max 25 character, if you want to put it like this
      allowNull: false,
      // validate: {
      //   len: [1, 25], // Alternative to type: Sequelize.DataTypes.STRING(25)
      // },

      defaultValue: "aras@email.com",
    },

    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 21,
    },

    permission: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // freezeTableName: A boolean that prevents Sequelize from automatically pluralizing the table name. If set to true, the table name will be the same as the model name.
    // timestamps: A boolean that determines whether to create createdAt and updatedAt columns in the database. If set to false, these columns will not be created.
    // tableName: A string that defines the name of the table in the database. If not specified, Sequelize will use the pluralized form of the model name.
    // version: A boolean or string that defines the name of the column that will be used for optimistic locking. If set to true, the default column name will be version. If set to a string, that string will be used as the column name.
    // paranoid: A boolean that enables "soft deletes", meaning that records are not actually deleted from the database but are marked as deleted by setting a deletedAt timestamp. If set to true, this option enables "soft deletes" for the model.
    // freezeTableName: true,
    // timeStamps: false,
    // tableName: "custom-name",
    // version: true,
    // version: true,
    // paranoid: true
  }
);

// createTableRow(User, longPassData); // failes because defies the password length which is not in between 5 and 10 characters! It is defined in the model's password section with "validate" keyword

// createTableRow(User, newData);

// deleteTableRowById(User, 1);

// findTableRowById(User, 1);

// updateTableColumnById(User, 1, "age", "15");

// alterTableNumericValue(User, 1, "age", 12);

// bulkCreateTableData(User, longPassDataSet); // failes because defies the password length which is not in between 5 and 10 characters! It is defined in the model's password section with "validate" keyword

// bulkCreateTableData(User, newDataSet);

// getAllTableData(User, ["name", "password"]); // second argument is optional

// getRawTableData(User);

// columTotalValue(User, "age");

// aggregateColumnswithSpecificName(User, "age", "name"); // Look for the User table, find the same "name" values, only add same "name" values' "age" columns.

// getUserOrAgewithOrOperator(User);

// getUserswithAgeinBetween23and40(User);

// findNamesWithCertainLength(User);

// updateNameIfAgeisMoreThan20(User);

// deleteEntriesWithNameWow(User);

// maxAge(User);

// totalAge(User);

// findByIndex(User, 2);

// findOneEntry(User);

findOrCreateEntry(User);

module.exports = User;
