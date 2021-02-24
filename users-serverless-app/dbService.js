const Logger = require("./logger/logger");
const { User, Songs, UserMedia } = require("./dbConnection");

const log = new Logger();

function createUsers(values) {
  return new Promise(async (resolve, reject) => {
    await User.create({
      FirstName: values.FirstName,
      LastName: values.LastName,
      Address: values.Address,
      OrganizationName: values.OrganizationName,
      Phone: values.Phone,
      Email: values.Email,
    })
      .then((results) => {
        log.info("dbService|createUsers", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("User not created!!");
        }
        log.info("dbService|User", log.methodEnd);
      })
      .catch((error) => {
        log.error(
          "dbService|createUsers",
          "Error in createUsers function " + error.message
        );
        reject(error);
      });
  });
}

function getUsers() {
  console.log("get user db service api");
  return new Promise(async (resolve, reject) => {
    await User.findAll()
      .then((results) => {
        log.info("dbService|Users", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("Users not found!!");
        }
        log.info("dbService|User", log.methodEnd);
      })
      .catch((error) => {
        log.error(
          "dbService|Users",
          "Error in Users function " + error.message
        );
        reject(error);
      });
  });
}

function getOneUser(value) {
  return new Promise(async (resolve, reject) => {
    await User.findOne({
      where: {
        id: value.id,
      },
    })
      .then((results) => {
        log.info("dbService|User", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("User not found!!");
        }
        log.info("dbService|User", log.methodEnd);
      })
      .catch((error) => {
        log.error("dbService|User", "Error in User function " + error.message);
        reject(error);
      });
  });
}

function updateUser(param, values) {
  return new Promise(async (resolve, reject) => {
    await User.update(
      {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        OrganizationName: values.OrganizationName,
        Phone: values.Phone,
        Email: values.Email,
      },
      {
        where: {
          id: param.id,
        },
      }
    )
      .then((results) => {
        log.info("dbService|updateUser", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("User not updated!!");
        }
        log.info("dbService|updateUser", log.methodEnd);
      })
      .catch((error) => {
        log.error(
          "dbService|updateUser",
          "Error in updateUser function " + error.message
        );
        reject(error);
      });
  });
}

function deleteUser(value) {
  return new Promise(async (resolve, reject) => {
    await User.destroy({
      where: {
        id: value.id,
      },
    })
      .then((results) => {
        log.info("dbService|deleteUser", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("User not deleted!!");
        }
        log.info("dbService|deleteUser", log.methodEnd);
      })
      .catch((error) => {
        log.error(
          "dbService|deleteUser",
          "Error in deleteUser function " + error.message
        );
        reject(error);
      });
  });
}

function getSongList(value) {
  console.log("get songs db service api");
  return new Promise(async (resolve, reject) => {
    await UserMedia.findAll({
      include: {
        model: Songs,
        attributes: ["SongName", "SongS3Key"],
      },
      where: {
        id: value.id,
      },
    })
      .then((results) => {
        log.info("dbService|getSongList", log.methodStart);
        if (results != null) {
          resolve(results);
          console.log(results);
        } else {
          reject("songs not found!!");
        }
        log.info("dbService|getSongList", log.methodEnd);
      })
      .catch((error) => {
        log.error(
          "dbService|getSongList",
          "Error in getSongList function " + error.message
        );
        reject(error);
      });
  });
}

module.exports = {
  getUsers,
  createUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getSongList,
};
