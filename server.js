const inquirer = require('inquirer');

// Questions
const prompotuser =() => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message:'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the deparment? (Required)',
            validate: departmentName => {
                if(departmentName) {
                    return true;
                } else {
                    console.log('Please enter the name of the department!');
                    return false;
                }
            },
            //add when
        }
    ])
};

prompotuser();