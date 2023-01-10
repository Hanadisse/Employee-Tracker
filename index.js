// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Suhaila0907!",
  database: "employee_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected");
  menu();
});
