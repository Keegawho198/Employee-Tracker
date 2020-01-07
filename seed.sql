Drop DATABASE IF EXISTS employee_DB;
Create database employee_DB;

use employee_DB;

CREATE TABLE employee (
id INT NOT Null AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL ,
manager_id INT Null ,
PRIMARY KEY(id) 
);
-- INSERT INTO employee SET first_name = "test9", last_name = "test", role_id = LAST_INSERT_ID();
INSERT INTO employee SET first_name = "test9", last_name = "test", role_id = 11;

DELETE FROM employee WHERE id = 14;

select * from employee;

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NUll,
PRIMARY KEY(id)
);

select * from role;  

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);	

select * from department;
INSERT INTO department SET department_name = "test";
DELETE FROM department WHERE id = 18;

-- SELECT employee.id, employee.first_name, employee.last_name
-- FROM employee INNER JOIN department ON (employee.id = department.id ) 


SELECT E.id, E.first_name, E.last_name, 
D.department_name, R.title, R.salary, E.manager_id
  FROM employee E
  JOIN role R ON R.Id = E.role_id
  JOIN department D ON D.id = R.department_id 
ORDER BY E.id