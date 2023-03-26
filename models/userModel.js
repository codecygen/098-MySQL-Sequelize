const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

const User = sequelize.define("user", {
    username: {

    }, 

    passwoord: {

    },

    email: {
        
    }
});

module.exports = User;