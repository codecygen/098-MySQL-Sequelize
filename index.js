require("dotenv").config();

const { sequelize, User, UserMotto, Post } = require("./models/dataAssociations");

// User.sync.then.catch, // would only sync User model.
sequelize
  // .sync({ force: true }) // deletes all data and recreates the database with the model configs,
  .sync({ alter: true }) // only alters the data structure in the database
  .then((result) => {
    console.log("Successfully created models!");
  })
  .catch((err) => {
    console.error(err);
  });
