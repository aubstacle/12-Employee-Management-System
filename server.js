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
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId)
  promptEmployee();
});

function promptEmployee() {
    inquirer.prompt([
        {
            name: 'start',
            type: 'list',
            message: 'Do you want to view, update or add to your employment team?',
            choices: ['Add', 'View', 'Update']
        }
    ]).then((ans) => {
        console.log(ans)

    })
}