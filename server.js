var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Freeman5",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptEmployee();
});

function promptEmployee() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          //   "View All Employees by Department",
          //   "View All Employees by Manager",
          "Add employee",
          //   "Remove Employee",
          "Update Employee Role",
          //   "Update Employee Manager",
          "Exit",
        ],
      },
    ])
    .then((ans) => {
      if (ans.start === "View All Employees") {
        viewEmployees();
      } else if (ans.start === "Add Employee") {
        addEmployee();
      } else if (ans.start === "Update Employee Role") {
        updateRole();
      } else if (ans.start === "Exit") {
        connection.end();
      }
    });
}

function viewEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", 
    (err, data) => {
        if (err) throw err;
        console.table(data);
        promptEmployee();
    })

}

function addEmployee() {
    
}
