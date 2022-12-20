const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(cors());
//to let api use the JSON body in request
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_list",
});

//read all users information
app.get("/users", function (req, res, next) {
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    res.json(results);
  });
});

//read user information with id
app.get("/users/:id", function (req, res) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});

//create user
app.post("/users", function (req, res) {
  connection.query(
    "INSERT INTO `users`(`fname`, `lname`, `username`, `email`, `avatar`) VALUES (?,?,?,?,?)",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.email,
      req.body.avatar,
    ],
    function (err, results) {
      res.json(results);
    }
  );
});

//update user information with id
app.put("/users/:id", function (req, res) {
  const id = req.params.id
  connection.query(
    "UPDATE `users` SET `fname`=?,`lname`=?,`username`=?,`email`=?,`avatar`=? WHERE id=?",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.email,
      req.body.avatar,
      id
    ],
    function (err, results) {
      res.json(results);
    }
  );
});

app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
