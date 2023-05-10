const inquirer = require('inquirer');
const mysql2 = require('mysql2');
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
    choices:['View All Employees']}
]
const viewEmployees = () => {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ').then(([response])=>{console.table(response)
    showOptions();
    })
};
  
function showOptions () {inquirer.prompt(questions).then((data)=>{
    switch(data.options){
         case 'View All Employees':
            viewEmployees();
            break;
    }
  })
};

function init() {
showOptions();
}

init();