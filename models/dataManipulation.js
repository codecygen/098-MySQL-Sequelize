const createTableRow = (tableModel, newData) => {
  // creates new data
  // const user = User.build({
  //   name: "aras",
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
  tableModel
    .create(newData) // directly saves data to MySQL, newData is an object
    .then((result) => {
      console.log("Added new user:", result.toJSON()); // unlike parse() in MongoDB, toJSON() is used in sequelize to get plain Javascript object.
    })
    .catch((err) => {
      console.error("Error saving user to the database:", err);
    });
};

const deleteTableRowById = (tableModel, tableId) => {
  tableModel
    .destroy({ where: { id: tableId } })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const findTableRowById = async (tableModel, tableId) => {
  try {
    const foundData = await tableModel.findByPk(tableId);

    foundData.id = 15354235;
    foundData.reload(); // reload method just reloads to the original database entry

    console.log(foundData.toJSON());
    return foundData; // do not return with toJSON(), it will break the sequelize, so any sequelize method won't work which would be returned by this function
  } catch (err) {
    console.error(err);
  }
};

const updateTableColumnById = async (tableModel, tableId, updatedKey, updatedValue) => {
  try {
    const foundData = await findTableRowById(tableModel, tableId);
    foundData[updatedKey] = updatedValue;

    await foundData.save({ fields: [updatedKey] }); // update name keyword as newRowName
    console.log("Data entry is updated with new name");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createTableRow,
  deleteTableRowById,
  findTableRowById,
  updateTableColumnById,
};
