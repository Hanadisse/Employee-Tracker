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
        viewDepartments();
      } else if (res.choice == "View all Roles") {
        viewRoles();
      } else if (res.choice == "View all Employees") {
        viewEmployees();
      } else if (res.choice == "Add a Department") {
        addDepartment();
      } else if (res.choice == "Add a Role") {
        addRole();
      } else if (res.choice == "Add a Employee") {
        addEmployee();
      } else if (res.choice == "Update a Employee") {
        updateEmployee();
      } else if (res.choice == "Quit") {
        console.log("Goodbye!");
      }
    });
}

// View All Departments
function viewDepartments() {
  db.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

// View All Roles
function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

// View All Employees
function viewEmployees() {
  db.query(`SELECT * FROM employee`, function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

// Add New Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((res) => {
      db.query(`INSERT INTO department SET ?`, {
        department_name: res.departmentName,
      });
      console.log(`Added ${res.departmentName} to the database`);
      menu();
    });
}

// Add New Role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Which department does the role belong to?",
      },
    ])
    .then((res) => {
      db.query(`INSERT INTO roles SET ?`, {
        title: res.roleName,
        salary: res.salary,
        department_id: res.roleDepartment,
      });
      console.log(`Added ${res.roleName} to the database`);
      menu();
    });
}

// Add New Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "employeeRole",
        message: "What is the employee's role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "What is the employee's manager id?",
      },
    ])
    .then((res) => {
      db.query(`INSERT INTO employee SET ?`, {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.employeeRole,
        manager_id: res.manager,
      });
      console.log(`Added ${res.firstName} ${res.lastName} to the database`);
      menu();
    });
}

// Update Employee Role
function updateEmployee() {
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        db.query(`SELECT * FROM roles`, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              db.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                params,
                (err) => {
                  if (err) throw err;
                  console.log("Employee has been updated!");
                  menu();
                }
              );
            });
        });
      });
  });
}
