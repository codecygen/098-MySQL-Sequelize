const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

const bcrypt = require("bcrypt");
const zlib = require("zlib");

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
  findAndCountTable,
  getterFunctionTest,
  setterFunctionTest,
  descriptionSetter,
  descriptionGetter,
  combineNameAndDescription,
  createUniqueCitizenshipId,
  emailValidityCheckAndInsertNewUser,
  ageValidityCheckAndInserNewUser,
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
      defaultValue: "aras",
      get() {
        // setter and getter functions can only use syncronous methods.
        const rawValue = this.getDataValue("name"); // "name" is the field in database
        return rawValue.toUpperCase();
      },
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      // validators.......
      // validate: {
      //   len: [5, 10],
      // },

      defaultValue: "arasaras",

      // enteredPassword argument is automatically passed as whatever the password is entered for new user creation.
      set(enteredPassword) {
        // setter and getter functions can only use syncronous methods.
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(enteredPassword, salt);
        this.setDataValue("password", hashedPassword); // "password" is the field in database
      },
    },

    email: {
      type: Sequelize.DataTypes.STRING, // type: Sequelize.DataTypes.STRING(25) means max 25 character, if you want to put it like this
      allowNull: false,
      validate: {
        // validators
        isEmail: true, // this is a built-in checker for sequelize
      },

      defaultValue: `aras@email.com`,
    },

    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 21,
      // validators
      validate: {
        isValidAge(enteredAge) {
          if (enteredAge < 18) {
            throw new Error("You cannot register because you are not 18!");
          }
        },
      },
    },

    citizenshipNumber: {
      type: Sequelize.DataTypes.BIGINT,
      unique: true,
      defaultValue: Math.abs(
        Math.floor(Math.random() * 1e14) - Math.floor(Math.random() * 1e13) * 10
      ),
    },

    permission: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },

    description: {
      type: Sequelize.DataTypes.STRING,

      // enteredDescription argument is automatically passed as whatever the description is entered for new user creation.
      set(enteredDescription) {
        // setter and getter functions can only use syncronous methods.
        const compressedDescription = zlib
          .deflateSync(enteredDescription)
          .toString("base64");
        this.setDataValue("description", compressedDescription);
      },

      get() {
        // setter and getter functions can only use syncronous methods.
        const compressedDescription = this.getDataValue("description"); // "description" is the field in database
        const enteredDescription = zlib
          .inflateSync(Buffer.from(compressedDescription, "base64"))
          .toString();
        return enteredDescription;
      },

      defaultValue: "A new dude in the village",
    },

    // this section will be used to retrieve name and description of a user
    nameAndDescription: {
      // this basically indicates that this property is not an actual property in database but rather used as an intermediary property which combines name and description properties in database.
      type: Sequelize.DataTypes.VIRTUAL,
      get() {
        // setter and getter functions can only use syncronous methods.
        return `name: ${this.name}\ndescription: ${this.description}`;
      },
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

// findOneEntry(User);,

// findAndCountTable(User);

// getterFunctionTest(User);

// setterFunctionTest(User, newData);

// descriptionSetter(User); // uses setter function in this file's description section for the user model to compress the description

// descriptionGetter(User); // uses getter function in this file's description section for the user model and uncompresses the description

// combineNameAndDescription(User);

// createUniqueCitizenshipId(User);

// emailValidityCheckAndInsertNewUser(User);

ageValidityCheckAndInserNewUser(User)

module.exports = User;
