const { sequelize, databaseAuth } = require("./dbConnection");

// Needs to be imported even if it is not used
// Because it is seen by sequelize.sync method in this file
// and the model is updated accordingly in database.
const User = require("./userModel");
const Post = require("./postModel");
const UserMotto = require("./userMottoModel");


databaseAuth();

// sequelize-associations
// "foreignKey" property changes default foreign key from "userId" to "allUsers"
User.hasOne(UserMotto, { foreignKey: 'allUsers' });

// User, UserMotto, Post has to be exported to index.js
// Because, we have to introduce them to the sequelize.sync method
// so the tables will be created.
module.exports = {
    sequelize, 
    User, 
    UserMotto, 
    Post
};