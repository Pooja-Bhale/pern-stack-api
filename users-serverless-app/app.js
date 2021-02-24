const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const dbService = require("./dbService");
const MusicFile = require("./getMusicFiles");
const User = require("./dbConnection");
const Logger = require("./logger/logger");
const log = new Logger();
app.use(cors());

// create a user

app.get("/home", (req, res) => {
  res.send({ Welcome: "This is the home page" });
  log.info("/home", log.methodEnd);
});

app.post("/CreateUser", async (req, res) => {
  dbService
    .createUsers(req.body)
    .then((results) => {
      log.info("/CreateUser", log.methodStart);
      res.send(results);
      log.info("/CreateUser", log.methodEnd);
    })
    .catch((error) =>
      log.error("/CreateUser", "Error in CreateUser API " + error.message)
    );
});

// Get all users
app.get("/Users", async (req, res) => {
  dbService
    .getUsers()
    .then((results) => {
      log.info("/Users", log.methodStart);
      res.send(results);
      log.info("/Users", log.methodEnd);
    })
    .catch((error) =>
      log.error("/Users", "Error in Users API " + error.message)
    );
});

//Get a user

app.get("/User/:id", async (req, res) => {
  dbService
    .getOneUser(req.params)
    .then((results) => {
      log.info("/User/:id", log.methodStart);
      res.send(results);
      log.info("/User/:id", log.methodEnd);
    })
    .catch((error) =>
      log.error("/User/:id", "Error in User API " + error.message)
    );
});

//update a user

app.put("/UpdateUser/:id", async (req, res) => {
  dbService
    .updateUser(req.params, req.body)
    .then((results) => {
      log.info("/UpdateUser/:id", log.methodStart);
      res.send(results);
      log.info("/UpdateUser/:id", log.methodEnd);
    })
    .catch((error) =>
      log.error("/UpdateUser/:id", "Error in UpdateUser API " + error.message)
    );
});

//Delete a user

app.delete("/DeleteUser/:id", async (req, res) => {
  dbService
    .deleteUser(req.params)
    .then((results) => {
      log.info("/DeleteUser/:id", log.methodStart);
      res.send(true);
      log.info("/DeleteUser/:id", log.methodEnd);
    })
    .catch((error) =>
      log.error("/DeleteUser/:id", "Error in DeleteUser API " + error.message)
    );
});

app.get("/SongList/:id", async (req, res) => {
  dbService
    .getSongList(req.params)
    .then((results) => {
      log.info("/SongList/:id", log.methodStart);
      res.send(results);
      log.info("/SongList/:id", log.methodEnd);
    })
    .catch((error) => {
      log.error("/SongList/:id", "Error in SongList API " + error.message);
      res.send(error);
    });
});

app.get("/MusicFile/:key", async (req, res) => {
  var { key } = req.params;
  MusicFile.getMusicFiles(key)
    .then((result) => {
      log.info("/MusicFile/:key", log.methodStart);
      res.send(result);
      log.info("/MusicFile/:key", log.methodEnd);
    })
    .catch((error) => {
      log.error("/MusicFile/:key", "Error in MusicFile API " + error.message);
      res.send(error);
    });
});

// start server
app.listen(5000, () => {
  console.log("server has started");
});

module.exports.handler = serverless(app);
