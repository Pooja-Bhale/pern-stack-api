const serverless = require("serverless-http"); 
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const dbService = require("./dbService");
const User = require("./dbConnection");
app.use(cors());


//Connection to Database
//client.connect().then(() => console.log("Connected to Db"));

// create a user

app.get("/home", (req, res) => {
  res.send({ Welcome: "This is the home page" });
});

app.post("/CreateUser", async (req, res) =>
 {
    var {
      FirstName,
      LastName,
      Address,
      OrganizationName,
      Phone,
      Email,
    } = req.body;
    dbService.createUsers(req.body).then(results=> {
      res.send(results);
    })
    .catch(error => console.log(error));
  
});

// Get all users
app.get("/Users", async (req, res) => {
    
    console.log("users api");
    dbService.getUsers().then(results=> {
      console.log("db service api");
      res.send(results);
    })
    .catch(error => console.log(error));

 
});

//Get a user

app.get("/User/:id", async (req, res) => {
  
    var { id } = req.params;
    dbService.getOneUser(req.params).then(results=> {
      res.send(results);
    })
    .catch(error => console.log(error));
  
});

//update a user

app.put("/UpdateUser/:id", async (req, res) => {
 
    var { id } = req.params;
    var {
      FirstName,
      LastName,
      Address,
      OrganizationName,
      Phone,
      Email,
    } = req.body;
    dbService.updateUser(req.params, req.body).then(results=> {
      res.send(results);
    })
    .catch(error => console.log(error));
});

//Delete a user

app.delete("/DeleteUser/:id", async (req, res) => {
  
    var { id } = req.params;
    dbService.deleteUser(req.params).then(results=> {

      res.send(true);
    })
    .catch(error => console.log(error));
});

// start server
app.listen(5000, () => {
  console.log("server has started");
});

module.exports.handler = serverless(app);