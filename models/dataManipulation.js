// build, save, create methods
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

// destroy method
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

// findByPk, reload methods, toJSON
const findTableRowById = async (tableModel, tableId) => {
  try {
    const foundData = await tableModel.findByPk(tableId);

    foundData.id = 15354235;
    foundData.reload(); // reload method just reloads to the original database entry

    console.log(foundData.toJSON()); // toJSON is used to get Javascript object
    return foundData; // do not return with toJSON(), it will break the sequelize, so any sequelize method won't work which would be returned by this function
  } catch (err) {
    console.error(err);
  }
};

// save method
const updateTableColumnById = async (
  tableModel,
  tableId,
  updatedKey,
  updatedValue
) => {
  try {
    const foundData = await findTableRowById(tableModel, tableId);
    foundData[updatedKey] = updatedValue;

    // await foundData.save({ fields: [updatedKey] }); // update name keyword as newRowName
    await foundData.save(); // not specifying the field is totally fine, because system knows which section is changed due to the command up top. It will increase the performance if it is written in this way.

    console.log("Data entry is updated with new name");
  } catch (err) {
    console.error(err);
  }
};

// increment, decrement methods
const alterTableNumericValue = (
  tableModel,
  tableId,
  updatedKey,
  alteredAmount
) => {
  findTableRowById(tableModel, tableId)
    .then((foundData) => {
      const alteredAmountNumber = parseFloat(alteredAmount);

      if (alteredAmountNumber >= 0) {
        foundData.increment({ [updatedKey]: alteredAmountNumber }); // increment method can accept multiple keys and values, not just one like in this example
        console.log("Data entry is updated with new numeric value");
      } else {
        // decrement method has to accept positive value
        foundData.decrement({ [updatedKey]: Math.abs(alteredAmountNumber) }); // decrement method can accept multiple keys and values, not just one like in this example
        console.log("Data entry is updated with new numeric value");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// bulkCreate method
// bulkCreate method decreases performance
// normally disregards validate keyword for password for User Model if the second argument "validate: true" is not specified.
const bulkCreateTableData = (tableModel, bulkData) => {
  tableModel
    .bulkCreate(bulkData, { validate: true }) // validate: true is needed if you want User Model's bulkData password lengths to be checked
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.error(err));
};

// findAll method
const getAllTableData = (tableModel, attributeList = []) => {
  let parenthesisObject = { attributes: attributeList }; // {attributes: []} or {attributes: []}

  tableModel
    .findAll(parenthesisObject) // findAll() also works, attributes should contain an array of attributes like ["name", "password"] so it will only filter those fields
    .then((allTableData) => {
      allTableData.forEach((element) => {
        console.log(element.toJSON());
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  createTableRow,
  deleteTableRowById,
  findTableRowById,
  updateTableColumnById,
  alterTableNumericValue,
  bulkCreateTableData,
  getAllTableData,
};
