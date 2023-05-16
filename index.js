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
];

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of the new department?'
    },
];

const addRoleQuestions = [
    {
        type:'input',
        name:'title',
        message: "What is the role's title?"
    },
    {
        type:'input',
        name:'salary',
        message: 'What is the salary for this role?'
    },
    {
        type:'input',
        name: 'department_id',
        message: 'What is the department id?'
    }
];

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's name"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
    },
    {
        type: 'input',
        name: 'role_id',
        message: "What is their role id?"
    },
    {
        type: 'input',
        name: 'manager_id',
        message: "What is their manager's id?"
    }
]

const viewAllEmployees = () => {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ').then(([response])=>{console.table(response)
    showOptions();
    })
};
// role department
const viewAllRole = () => {
    db.promise().query('SELECT role.title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id').then(([response])=> {
        console.table(response)
        showOptions()
        });
    
};

const viewAllDepartments = () => {
    db.promise().query('SELECT * FROM department').then(([response])=>{
        console.table(response);
        showOptions();
    })
};
const addDepartment = () => {
    inquirer.prompt(addDepartmentQuestions).then((response)=>{
        console.log(response)

        db.promise().query('INSERT INTO department SET ?', response).then(([response])=>{
            console.table(response)
            showOptions();
        })
    })
};
const addRole = () => {
    inquirer.prompt(addRoleQuestions).then((response)=>{
        console.log(response)
        db.promise().query('INSERT INTO role SET ?',response).then(
            ([response])=>{
                console.log(response)
                showOptions();
            }
        )
        
    })
};
const addEmployee = () => {
    inquirer.prompt(addEmployeeQuestions).then((response)=>{
        console.log(response)
        db.promise().query('INSERT INTO employee SET ?',response).then(
            ([response])=>{
                console.log(response)
                showOptions();
            }
        )
        
    })
};

const updateEmployee = () => {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ').then(([employeeResponse])=>{
        // console.log(employeeResponse)
        const employeeArr = employeeResponse.map(({id, first_name, last_name})=>({
            name:`${first_name} ${last_name}`,
            value: id
        }))
        // console.log(employeeArr)
        db.promise().query('SELECT role.id, role.title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id').then(([roleResponse])=> {
            console.log(roleResponse)
            const roleArr = roleResponse.map(({id, title})=>({
                name: title,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeChoice',
                    message: 'What employee would you like to update?',
                    choices: employeeArr
                },
                {
                    type: 'list',
                    name: 'roleChoice',
                    message: 'What role would you like to update?',
                    choices: roleArr
                }
            ]).then((response)=>{
                console.log(response)

                db.promise().query('UPDATE employee SET role_id = ? WHERE id = ? ', [response.roleChoice, response.employeeChoice]).then(([response])=>{
                    console.log('Employee updated!')
                    showOptions();
                })
            })
            });
        })

    
};
  
function showOptions () {
    inquirer.prompt(questions).then((data)=>{
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