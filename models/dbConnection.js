const Sequelize = require("sequelize");

const {DB, SCHEMA, ADMIN, PASS, HOST, PORT} = process.env;

const sequelize = new Sequelize(SCHEMA, ADMIN, PASS, {
  dialect: DB,
  host: HOST,
  port: PORT,    
  //freezeTableName: true, // means in the next restarts, even if the model names get changed in the configs, do not change them in the database.
});

const databaseAuth = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection is successful!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sequelize, databaseAuth };
