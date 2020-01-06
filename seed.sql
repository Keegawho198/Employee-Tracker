Drop DATABASE IF EXISTS employee_DB;
Create database employee_DB;

use employee_DB;

CREATE TABLE employee (
id INT NOT Null,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT Null,
PRIMARY KEY(id) 
);

CREATE TABLE role(
id INT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NUll,
PRIMARY KEY(id)
);

CREATE TABLE department(
id INT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);	

