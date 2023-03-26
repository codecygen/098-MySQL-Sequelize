const { sequelize, databaseAuth } = require("./models/databaseConnection");

databaseAuth
  .then(() => {
    console.log("Connection is successful!");
  })
  .catch((err) => {
    console.error(err);
  });
