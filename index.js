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
                    name:"Veiw All Employees",
                    value:"VIEW_EMPLOYEES"
                },
                {
                    
                }
            ]
        }
    ]);


    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        default:
            break;
    }
}

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.table(employees);

    start();
}