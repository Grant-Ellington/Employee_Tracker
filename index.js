const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');
const { inherits } = require('util');

const db = mysql2.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'GrantEllington1.',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
const questions = [
    {type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices:['View All Employees', 'View All Roles', 'View All Departments','Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role' ]}
]
const viewAllEmployees = () => {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ').then(([response])=>{console.table(response)
    showOptions();
    })
};

const viewAllRole = () => {
    db.promise().query('SELECT role.title, role.department_id, role.salary FROM department LEFT JOIN role ON role.department_id = department.id  ' ).then(([response])=> console.table(response))
};

const viewAllDepartments = () => {

};
const addDepartment = () => {};
const addRole = () => {};
const addEmployee = () => {};
const updateEmployee = () => {};
  
function showOptions () {inquirer.prompt(questions).then((data)=>{
    switch(data.options){
         case 'View All Employees':
            viewAllEmployees();
            break;
        case 'View All Roles':
            viewAllRole()
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
            break;
    }
  })
};

function init() {
showOptions();
}

init();

// mysql query for adding data
// INSERT INTO [table name] SET [data]