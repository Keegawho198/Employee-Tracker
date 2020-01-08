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
        add();
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
      for (var i = 0; i < res.length; i++) {
        // console.log(res[i]);
        // console.table(['ID', 'Name'], res[i]);
        // console.table("ID | First Name");
        // console.table(res[i].id + res[i].first_name);
        // console.table()
        console.table(res[i]);
      }
      console.log(query.sql);
      begin();
    });
  // connection.end();
}


function add() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter employee's first name: "
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter employee's last name: "
      },
      {
        name: "department_name",
        type: "input",
        message: "Enter department name: "
      },
      {
        name: "title",
        type: "input",
        message: "Enter title of Employee: "
      },
      {
        name: "salary",
        type: "input",
        message: "Enter $ salary: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.department_name
        },

        // },
        //
        function (err, dept) {
          if (err) throw err;
         // console.log(err);
          // console.log(dept) //dept is response of query
          console.log("Employee department successfully added!"); //move next query after here. for the unique id use "insertId"

          // start();
          connection.query(
           // "INSERT INTO employee SET ? role_id = LAST_INSERT_ID()", not working
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: dept.insertId,
            },
            function (err, emp) {
              if (err)
                // console.log("Error while inserting employee");
                throw err;
                console.log("Employee successfully added!"); //move next query after here. for the unique id use "insertId"
                // console.log(emp) 
              
                connection.query(
                "INSERT INTO role SET ?", 
                {
                  title: answer.title,
                  salary: answer.salary,
                  department_id: emp.insertId
                },
                function (err, role){
                  if(err)
                  throw err;
                  console.log("role added successfully");
                  // console.log(role);
                });
                begin();
        });
      });
    });
    
  }