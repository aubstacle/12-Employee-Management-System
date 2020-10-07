DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8 , 2 ) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES("Engineering"),("Finance"),("Sales"),("Legal");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES("Sales Lead", 100000, 3), ("Salesperson", 80000, 3), ("Lead Engineer", 150000, 1), ("Software Engineer", 120000, 1), ("Accountant", 125000, 2), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Freddie", "Freeman", 3), ("Marcell", "Ozuna", 3), ("Ronald", "Acuña", 1), ("Dansby", "Swanson", 1), ("Ozzie", "Albies", 2), ("Adam", "Duvall", 4), ("Travis", "dArnaud", 4), ("Austin", "Riley", 2); 

SELECT * FROM employee;

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;




