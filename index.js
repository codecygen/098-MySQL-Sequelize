require("dotenv").config();

const { sequelize, databaseAuth } = require("./models/dbConnection");
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
