const createTableRow = (tableModel, newData) => {
  // creates new data
  // const user = User.build({
  //   username: "aras",
  //   password: "useraras",
  //   email: "aras@gmail.com",
  //   age: 23,
  //   permission: true
  // });

  // saves new data to MySQL
  // user.save()
  //   .then(result => {
  //     console.log("User saved to the database:", result);
  //   })
  //   .catch(err => {
  //     console.error("Error saving user to the database:", err);
  //   });

  // instead of const user = User.build, user.save
  tableModel.create(newData) // directly saves data to MySQL, newData is an object
    .then((result) => {
      console.log("Added new user:", result.toJSON()); // unlike parse() in MongoDB, toJSON() is used in sequelize to get plain Javascript object.
    })
    .catch((err) => {
      console.error("Error saving user to the database:", err);
    });
};

const deleteTableId = (tableModel, userId) => {
  tableModel.destroy({ where: { id: userId } })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { createTableRow, deleteTableId };
