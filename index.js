const inquirer = require('inquirer');
const db = require('./db');
require("console.table");

// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   });


  // Questions
// const prompotuser =() => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'option',
//             message:'What would you like to do?',
//             choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
//         },
//         {
//             type: 'input',
//             name: 'department',
//             message: 'What is the name of the deparment? (Required)',
//             validate: departmentName => {
//                 if(departmentName) {
//                     return true;
//                 } else {
//                     console.log('Please enter the name of the department!');
//                     return false;
//                 }
//             },
//         }
//     ])
// };

// prompotuser();

start();

async function start() {
    const {choice} = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices:[
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All roles",
                    value: "VIEW_ROLES"
                },
                {
                    name:"View All Employees",
                    value:"VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an Employee Role",
                    value: "UPDATE_EMPLOYEE"
                }
            ]
        }
    ]);


    switch (choice) {
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        default:
            break;
    }
};

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.table(employees);

    start();
};

async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.table(departments);
    start();
};