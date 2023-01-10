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

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add a Employee",
          "Update a Employee",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      if (res.choice == "View all Departments") {
        // viewDepartments();
      } else if (res.choice == "View all Roles") {
        // viewRoles();
      } else if (res.choice == "View all Employees") {
        // viewEmployees();
      } else if (res.choice == "Add a Department") {
        // addDepartment();
      } else if (res.choice == "Add a Role") {
        // addRole();
      } else if (res.choice == "Add a Employee") {
        // addEmployee();
      } else if (res.choice == "Update a Employee") {
        // updateEmployee();
      } else if (res.choice == "Quit") {
        console.log("Goodbye!");
      }
    });
}
