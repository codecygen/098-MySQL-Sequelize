const { Op } = require("sequelize");
const { sequelize } = require("./dbConnection");

// build, save, create methods
const createTableRow = (tableModel, newData) => {
  // only creates new data
  // const user = User.build({
  //   name: "aras",
  //   password: "useraras",
  //   email: "aras@gmail.com",
  //   age: 23,
  //   permission: true
  // });

  // only saves new data to MySQL
  // user.save()
  //   .then(result => {
  //     console.log("User saved to the database:", result);
  //   })
  //   .catch(err => {
  //     console.error("Error saving user to the database:", err);
  //   });

  // instead of const user = User.build, user.save,
  // create method does the job of build and save combined
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

// findAll method (1/4)
const getAllTableData = (tableModel, attributeList = []) => {
  let parenthesisObject = { attributes: attributeList }; // {attributes: []} or {attributes: ["name", "password"]}

  tableModel
    .findAll(parenthesisObject) // findAll() also works, attributes should contain an array of attributes like ["name", "password"] so it will only filter those fields
    .then((allTableData) => {
      allTableData.forEach((element) => {
        console.log(element.toJSON());
        // console.log(element.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// findAll method (2/3)
// raw: true // returns only the raw data instead of the response object
// in then() block.
const getRawTableData = (tableModel) => {
  tableModel
    .findAll({ raw: true }) // ({where: { age: 25 }, raw: true}) // this is also valid
    .then((allTableData) => {
      console.log(allTableData);
    })
    .catch((err) => {
      console.error(err);
    });
};

// findAll method (3/4)
const columTotalValue = (tableModel, columnName) => {
  tableModel
    .findAll({
      // User.findall({attributes: ["name", "password"]}).then().catch()
      // User.findall({attributes: {exclude: ["password"]}}).then().catch() is another way.

      // User.findall({where: {age: 45}}).then.catch() is another way.
      // User.findall({where: {age: 45, username: "aras"}}).then().catch()
      // User.findAll({ where: { age: 45 }, attributes: ["username"] }) // this only retrieves the username of the data where the age is 45 for the user.

      // User.findAll({limit: 2}).then().catch()

      // User.findAll({order: [["age", "DESC"]]}).then().catch() // "DESC" and "ASC" mean order them in descending and ascending order respectively.

      // "SUM", "AVG", "MAX", "MIN", "COUNT",
      // "total" is an alias so total column value will be named as "total"
      attributes: [[sequelize.fn("SUM", sequelize.col(columnName)), "total"]],
    })
    .then((data) => {
      data.forEach((element) => {
        console.log(element.toJSON());
        // console.log(element.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// findAll method (4/4)
// This section will show the total age of the same names,
// For example it will only add the ages of the same names.

// Here, all names' age will be added up as per their respective name's
// total age of the respective names will be calculated and the result will
// show with title "total" for the total ages. Example output:
// { name: 'jordan', total: '12' }
// { name: 'newdude', total: '38' }
// { name: 'aras', total: '23' }
// { name: 'aras2', total: '45' }
// { name: 'aras5', total: '11' }
const aggregateColumnswithSpecificName = (
  tableModel,
  addedColumnName,
  groupColumnName
) => {
  tableModel
    // .findAll({
    //   attributes: [
    //     "name",
    //     [sequelize.fn("SUM", sequelize.col("age")), "total"], // ---------------- "SUM", "AVG", "MAX", "MIN", "COUNT"
    //   ],
    //   group: "name",
    // })
    .findAll({
      attributes: [
        groupColumnName,
        [sequelize.fn("SUM", sequelize.col(addedColumnName)), "total"],
      ],
      group: groupColumnName,
    })
    .then((data) => {
      data.forEach((element) => {
        console.log(element.toJSON());
        // console.log(element.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// or, and operator
const getUserOrAgewithOrOperator = (tableModel) => {
  tableModel
    .findAll({ where: { [Op.or]: [{ name: "jordan" }, { age: 12 }] } }) // Op.and opearator can also be used
    .then((data) => {
      data.forEach((result) => {
        console.log(result.toJSON());
        // console.log(result.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// (gt, eq, or, lt) operators are all working with similar logic
const getUserswithAgeinBetween23and40 = (tableModel) => {
  tableModel
    .findAll({
      where: {
        age: {
          [Op.and]: {
            [Op.gt]: 23,
            [Op.lt]: 40,
          },
        },
      },
    })
    .then((data) => {
      data.forEach((entry) => {
        console.log(entry.toJSON());
        // console.log(entry.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Find names that has 5 characters.
// sequelize.where method
const findNamesWithCertainLength = (tableModel) => {
  tableModel
    .findAll({
      where: sequelize.where(
        sequelize.fn("char_length", sequelize.col("name")),
        5
      ),
    })
    .then((data) => {
      data.forEach((entry) => {
        console.log(entry.toJSON());
        // console.log(entry.name); this will display "name" keyword without using toJSON() method.
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Change name to "Yes!" if the age is more than 20.
// update method
const updateNameIfAgeisMoreThan20 = (tableModel) => {
  tableModel
    .update({ name: "Wow" }, { where: { age: { [Op.gt]: 20 } } })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// destroy method,
// if you want to delete all entries simply use
// destroy() or // this option will log each individial delete events to console
// destroy({ truncate: true }) // this is only useful if you have a large content in database and don't need any console log.
const deleteEntriesWithNameWow = (tableModel) => {
  tableModel
    .destroy({ where: { name: "Wow" } })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// max method
// max("age", { where: { age: 21 } }) // this method can also take where as a parameter
const maxAge = (tableModel) => {
  tableModel
    .max("age")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// sum method
// sum("age", { where: { age: 21 } }) // this method can also take where as a parameter
const totalAge = (tableModel) => {
  tableModel
    .sum("age")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// findByPk method
const findByIndex = (tableModel, indexNumber) => {
  tableModel
    .findByPk(indexNumber /* { raw: true } */)
    .then((data) => {
      console.log(data.toJSON()); // or console.log(data);
      // console.log(data.name); this will display "name" keyword without using toJSON() method.
    })
    .catch((err) => {
      console.error(err);
    });
};

// findOne method
const findOneEntry = (tableModel) => {
  tableModel
    .findOne({ where: { id: 6 } }) // if findOne(), it only finds the first instance of the table
    .then((data) => {
      console.log(data.toJSON());
      // console.log(data.name); this will display "name" keyword without using toJSON() method.
    })
    .catch((err) => {
      console.error(err);
    });
};

// findOrCreate method
const findOrCreateEntry = (tableModel) => {
  tableModel
    // defaults keyword is used to overwrite the userModel.js model creation defaultValue section of the age.
    .findOrCreate({ where: { name: "newdude" } /* defaults: { age: 76 } */ }) // because we have default values of password, email and other properties defined in userModel.js, they are auto added if name "newdude" is non-existent in database
    .then((data) => {
      const [result, isCreated] = data;
      // console.log(result);
      console.log(isCreated);
    })
    .catch((err) => {
      console.error(err);
    });
};

// findAndCountAll method
const findAndCountTable = (tableModel) => {
  tableModel
    .findAndCountAll({ where: { name: "newdude" }, raw: true })
    .then((data) => {
      const { count, rows } = data;
      console.log(count);
      console.log(rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

// getter function in userModel.js, lets see how it effects our output now!
// check "name" section of userModel.js

// get() {
//   const rawValue = this.getDataValue("name");
//   return rawValue.toUpperCase();
// }
const getterFunctionTest = (tableModel) => {
  tableModel
    .findOne({ where: { name: "aras5" } })
    .then((foundEntry) => {
      console.log(foundEntry.name); // will print uppercased version of the database name
    })
    .catch((err) => {
      console.error(err);
    });
};

const setterFunctionTest = (tableModel, newDataObj) => {
  tableModel
    .create(newDataObj)
    .then((result) => {
      console.log(result.toJSON());
      console.log("name", result.name);
      console.log("password: ", result.password);
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
  getRawTableData,
  columTotalValue,
  aggregateColumnswithSpecificName,
  getUserOrAgewithOrOperator,
  getUserswithAgeinBetween23and40,
  findNamesWithCertainLength,
  updateNameIfAgeisMoreThan20,
  deleteEntriesWithNameWow,
  maxAge,
  totalAge,
  findByIndex,
  findOneEntry,
  findOrCreateEntry,
  findAndCountTable,
  getterFunctionTest,
  setterFunctionTest,
};
