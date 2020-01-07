//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '' 

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  begin();
});


function begin() {
  inquirer
    .prompt({
      name: "firstChoice",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", 
      "Add an Employee",
      "Exit"
      ]
    })
    .then(function (answer) {
      if (answer.firstChoice == "View all employees") {
        console.log("Viewing all employees")
        viewAll();
      } else if (answer.firstChoice == "Add an Employee") {
        console.log("Add details for employee");
        // moreThanOnce();
      }
      else {
        console.log("U chose to exit");
        connection.end();
      }
    })
  // connection.end();
}


function viewAll() {
  console.log("Current Employees");
      var query = connection.query(
        //shows details of employees from sql csv files
        "SELECT E.id, E.first_name, E.last_name, D.department_name, R.title, R.salary, E.manager_id FROM employee E JOIN role R ON R.Id = E.role_id JOIN department D ON D.id = R.department_id ORDER BY E.id",
        function (err, res) {
          if (err) throw err;
          for(var i = 0; i < res.length; i++){
          // console.log(res[i]);
          console.table(res[i]);
        }
        console.log(query.sql);
        begin();
        });
      // connection.end();
}