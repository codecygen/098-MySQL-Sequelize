require("dotenv").config();

const { sequelize, databaseAuth } = require("./models/dbConnection");

// Needs to be imported even if it is not used
// Because it is seen by sequelize.sync method in this file
// and the model is updated accordingly in database.
const User = require("./models/userModel");

databaseAuth();

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log("Successfully created models!");
  })
  .catch((err) => {
    console.error(err);
  });
