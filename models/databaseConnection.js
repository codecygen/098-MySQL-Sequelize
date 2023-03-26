const Sequelize = require("sequelize");

const sequelize = new Sequelize("sequelize-work", "root", "NEWPASSWORD", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

const databaseAuth = sequelize
  .authenticate()
  .then(() => {
    console.log("Connection is successful!");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = { sequelize, databaseAuth };
