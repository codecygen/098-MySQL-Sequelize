const Sequelize = require("sequelize");
const { sequelize } = require("./dbConnection");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Post;
