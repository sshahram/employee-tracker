const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.query("SELECT id as department_id, name AS department_name FROM department;");
    }

    findAllRoles() {
        return this.connection.query("SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;");
    }

    findAllEmployees(){
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }

    addDepartment(params) {
        return this.connection.query(`INSERT INTO department (name) VALUES(?);`, params);
    }

    addRole(params) {
        // console.log("params",params);
        return this.connection.query(`INSERT INTO role SET ?`, params);
    }

    addEmployee(params) {
        // console.log("params",params);
        return this.connection.query(`INSERT INTO employee SET ?`, params);
    }

    findManagers() {
        return this.connection.query(`SELECT id, CONCAT(first_name, ' ',last_name) AS name from employee;`);
    }

    updateEmployee(params) {
        return this.connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, params);
    }
}

module.exports = new DB(connection);