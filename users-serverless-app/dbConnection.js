const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "root1234", {
  host: "fv-training-postgres-db.cceuus0qz7n7.ap-south-1.rds.amazonaws.com",
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

const User = sequelize.define("PoojaUser", {
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

const Songs = sequelize.define("Songs", {
  SongId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically gets converted to SERIAL for postgres
  },
  SongName: {
    type: DataTypes.STRING,
  },
  SongS3Key: {
    type: DataTypes.STRING,
  },
});

const UserMedia = sequelize.define("UserMedia", {
  MediaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true, // Automatically gets converted to SERIAL for postgres
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "PoojaUsers",
      key: "id",
    }, // Automatically gets converted to SERIAL for postgres
  },
  SongId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Songs", // table name
      key: "SongId", // field name
    }, // Automatically gets converted to SERIAL for postgres
  },
});

UserMedia.belongsTo(User, { foreignKey: "id" });

UserMedia.belongsTo(Songs, { foreignKey: "SongId" });

User.sync();
Songs.sync();
UserMedia.sync();

module.exports = { User, Songs, UserMedia };
