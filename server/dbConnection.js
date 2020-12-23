const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("pernapi", "postgres", "Admin101", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define("User", {
  FirstName: {
    type: DataTypes.STRING,
  },
  LastName: {
    type: DataTypes.STRING,
  },
  Address: {
    type: DataTypes.STRING,
  },
  OrganizationName: {
    type: DataTypes.STRING,
  },
  Phone: {
    type: DataTypes.STRING,
  },
  Email: {
    type: DataTypes.STRING,
  },
});

User.sync();
module.exports = { User };
