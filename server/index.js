
const express = require('express');
const cors = require ('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const client = require('./db');

app.use(cors());

//Connection to Database
client.connect().then(() => console.log("Connected to Db"));

// create a user

app.post("/CreateUser", async(req, res) =>{
    try{
        console.log(req.body);

        const {FirstName, LastName} = req.body;
        const newUser = client.query("insert into Users (FirstName, LastName) VALUES ($1, $2) " , 
        [ FirstName, LastName]
        );

        res.json(newUser.rows);
    }
    catch(err){
        console.error(err.message);
    }
});


// Get all users
app.get("/Users", async (req, res) => {
    try {
      const allUsers = await client.query("SELECT * FROM Users");
      res.json(allUsers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //Get a user

app.get("/User/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await client.query("SELECT * FROM Users WHERE UserId = $1", 
        [id]
      );
  
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
//update a todo

app.put("/UpdateUser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { FirstName, LastName } = req.body;
      const updateUser = await client.query(
        "UPDATE Users SET FirstName = $1, LastName = $2 WHERE UserId = $3",
        [FirstName, LastName, id]
      );
  
      res.json("User updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //Delete a user

app.delete("/DeleteUser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await client.query("DELETE FROM Users WHERE UserId = $1", [
        id
      ]);
      res.json("User deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

// start server  
app.listen(5000, () => {
    console.log("server has started");
});
