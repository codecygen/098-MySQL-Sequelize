require("dotenv").config();

const { sequelize, databaseAuth } = require("./models/dbConnection");

// Needs to be imported even if it is not used
// Because it is seen by sequelize.sync method in this file
// and the model is updated accordingly in database.
const User = require("./models/userModel");
const Post = require("./models/postModel");

databaseAuth();

// User.sync.then.catch, // would only sync User model.
// User.drop(); // would drop the table and if we write it would not exist.
// sequelize.drop({ match: /^test/ }); // drop tables that starts with "test"
// sequelize.drop({ match: /test$/ }); // drop tables that ends with "test"
// sequelize.drop({ match: /aras/i }); // drop tables that has "aras" in it, looks for the string in a case insensitive way.
// sequelize.drop({ match: /g/g }); // drop tables that has letter "g" in it.
// sequelize.drop({ match: /g/ }); // find the first occurence of letter g in a tables and drop them.
// sequelize.drop({ match: /\d/g }); // finds all occurences of digits in tables and drop them.

sequelize
  // .sync({ force: true }) // deletes all data and recreates the database with the model configs,
  .sync({ alter: true }) // only alters the data structure in the database
  .then((result) => {
    console.log("Successfully created models!");
  })
  .catch((err) => {
    console.error(err);
  });
