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
  init();
});

function init() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View Employees by Department",
          "View Employees by Role",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
        ],
      },
    ])
    .then((ans) => {
      if (ans.start === "View All Employees") {
        viewEmployees();
      } else if (ans.start === "View All Departments") {
        viewDepartments();
      } else if (ans.start === "View All Roles") {
        viewRoles();
      } else if (ans.start === "View Employees by Department") {
        viewByDepartment();
      } else if (ans.start === "View Employees by Role") {
        viewByRole();
      } else if (ans.start === "Add Employee") {
        addEmployee();
      } else if (ans.start === "Add Role") {
        addRole();
      } else if (ans.start === "Add Department") {
        addDepartment();
      } else if (ans.start === "Update Employee Role") {
        updateEmployeeRole();
      }
    });
}

function viewEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;",
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

function addEmployee() {
  connection.query("SELECT * FROM role", (err, data) => {
    const roleTitle = data.map((role) => role.title);
    inquirer
      .prompt([
        {
          name: "first",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "title",
          type: "list",
          message: "What is the employee's role?",
          choices: roleTitle,
        },
      ])
      .then(({ first, last, title }) => {
        const titleChoice = data.find(
          (roleObject) => roleObject.title === title
        );
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: first,
            last_name: last,
            role_id: titleChoice.id,
          },

          (err, data) => {
            if (err) throw err;
            viewEmployees();
            init();
          }
        );
      });
  });
}

function addRole() {
  connection.query("SELECT * FROM department", (err, data) => {
    const deptTitle = data.map((department) => department.department);
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the name of the new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this new role?",
        },
        {
          name: "dept",
          type: "list",
          message: "What department does this role fall under?",
          choices: deptTitle,
        },
      ])
      .then(({ role, salary, dept }) => {
        const roleChoice = data.find(
          (departmentObject) => departmentObject.department === dept
        );
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: role,
            salary: salary,
            department_id: roleChoice.id,
          },

          (err, data) => {
            if (err) throw err;
            init();
          }
        );
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then(({ department }) => {
      connection.query(
        "INSERT INTO department SET ?;",
        {
          department: department,
        },
        (err, data) => {
          if (err) throw err;
          init();
        }
      );
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function viewByDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    const departmentTitles = data.map((department) => department.department);
    inquirer
      .prompt([
        {
          name: "dept",
          type: "list",
          message: "Which department employees do you want to see?",
          choices: departmentTitles,
        },
      ])
      .then(({ dept }) => {
        connection.query(
          `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = '${dept}';`,
          (err, data) => {
            if (err) throw err;
            console.table(data);
            init();
          }
        );
      });
  });
}

function viewByRole() {
  connection.query("SELECT * FROM role", (err, data) => {
    const roleTitles = data.map((role) => role.title);
    inquirer
      .prompt([
        {
          name: "role",
          type: "list",
          message: "Which type of employees do you want to see?",
          choices: roleTitles,
        },
      ])
      .then(({ role }) => {
        connection.query(
          `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE title = '${role}';`,
          (err, data) => {
            if (err) throw err;
            console.table(data);
            init();
          }
        );
      });
  });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM role", (err, data) => {
    const roleTitle = data.map((role) => role.title);
    inquirer
      .prompt([
        {
          name: "first",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "title",
          type: "list",
          message: "What is the employee's new role?",
          choices: roleTitle,
        },
      ])
      .then(({ first, last, title }) => {
        const titleChoice = data.find(
          (roleObject) => roleObject.title === title
        );
        connection.query(
          "UPDATE employee SET ? WHERE ? AND ?",
          [
            {
              role_id: titleChoice.id,
            },
            {
              first_name: first,
            },
            {
              last_name: last,
            },
          ],
          (err, data) => {
            if (err) throw err;
            viewEmployees();
            init();
          }
        );
      });
  });
}
