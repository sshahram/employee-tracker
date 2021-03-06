// dependencies
const inquirer = require('inquirer');
const db = require('./db');
require("console.table");

// function to start the application
start();

// Main menu options
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
                },
                {
                    name: "Exit",
                    value: "Exit"
                }
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "ADD_DEPARTMENT":
            return addingDepartment();
        case "ADD_ROLE":
            return addingRole();
        case "ADD_EMPLOYEE":
            return addingEmployee();
        case "UPDATE_EMPLOYEE":
            return updatingEmployee();
        case "Exit":
            return end();
        default:
            break;
    }
};

// Option: View All Employees
async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.table(employees);

    start();
};

// Option: View All Departments
async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.table(departments);
    start();
};

// Option: View All roles
async function viewRoles() {
    const roles = await db.findAllRoles();

    console.table(roles);
    start();
}

// Option: Add a department
async function addingDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: 'Please enter the name of new department: (Required)',
            validate: deptInput => {
                if(deptInput) {
                    return true;
                } else {
                    console.log('Please enter the name of new department!');
                    return false;
                }
            }
        }
    ]);

    const new_department = await db.addDepartment(department.dept_name);

    // console.log(new_department);
    start();
}

// Option: Add a role
async function addingRole(){
   const departments = await db.findAllDepartments();
   const deptOptions = departments.map(({department_id, department_name}) =>( {
   name: department_name,
   value: department_id
}));

// console.log(deptOptions);
   const role = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What role would you like to add? (Required)",
            validate: roleInput => {
                if(roleInput) {
                    return true;
                } else {
                    console.log('Please enter the role name!');
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "salary",
            message: "What would be the salary for this role? (Required)",
            validate: salaryInput => {
                if(salaryInput) {
                    return true;
                } else {
                    console.log("Please enter the salary for this role!");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: deptOptions
        }
    ])

    const new_role = await db.addRole(role);

    // console.log(new_department);
    start();
}

// Option: Add an Employee
async function addingEmployee() {
    const roles = await db.findAllRoles();
    const roleOptions = roles.map(({role_id, job_title}) =>( {
        name: job_title,
        value: role_id
    }));

    const managers = await db.findManagers();
    const managerOptions = managers.map(({id, name}) =>( {
        name: name,
        value: id
    }));
    managerOptions.unshift('None');

    const employee = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee? (Required)",
            validate: firstNameInput => {
                if(firstNameInput) {
                    return true;
                } else {
                    console.log('Please enter the first name of new employee!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee? (Required)",
            validate: lastNameInput => {
                if(lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter the last name of new employee!");
                }
            }
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the role of this employee?",
            choices: roleOptions
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the manager for this employee?",
            choices: managerOptions
        }
    ])
    if (employee.manager_id === 'None') {
        employee.manager_id = null;
    }
    const new_employee = await db.addEmployee(employee);
    start();
}

// Option: Update an Employee role
async function updatingEmployee() {
    const roles = await db.findAllRoles();
    const roleOptions = roles.map(({role_id, job_title}) =>( {
        name: job_title,
        value: role_id
    }));

    const employees = await db.findManagers();
    const employeeOptions = employees.map(({id, name}) =>( {
        name: name,
        value: id
    }));

    const employee = await inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: employeeOptions
        },
        {
            type: "list",
            name: "role_id",
            message: "What would be the new role for this employee?",
            choices: roleOptions
        }
    ])
    const update_employee = await db.updateEmployee([employee.role_id, employee.id]);
    start();
}

// exit the menu
function end() {
    console.log("Thank you, Bye!");
    process.exit();
  }
