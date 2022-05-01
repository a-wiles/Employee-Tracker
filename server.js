const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table')

const startMenu = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Please choose a following option',
            choices: ['View All',
                'View all departments',
                'View all employees',
                'View all roles',
                'Add a department',
                'Add an employee',
                'Add a role',
                'Update an employees role',
                'Exit']
        }
    ]).then((answers) => {
        var { choices } = answers;
    
        if (choices === "View All") {
            viewAll();
        } else if (choices === "View all departments") {
            viewDepartments();
        } else if (choices === "View All Employees") {
            viewAllEmployees();
        } else if (choices === "View all roles") {
            viewAllRoles();
        } else if (choices === "Add a department") {
            addDepartment();
        } else if (choices === "Add a role") {
            addRole();
        } else if (choices === "Add an employee") {
            addEmployee();
        } else if (choices === "Update an employee role") {
            updateEmployee();
        } else if (choices === "Exit") {
            connection.end();
            process.exit(0)
        };
    });
}
function viewAll() {
    db.query("SELECT D.NAME,R.TITLE,R.SALARY,E.FIRST_NAME,E.LAST_NAME,MANAGER_ID FROM DEPARTMENT D,ROLE R, EMPLOYEE E WHERE D.ID = R.DEPARTMENT_ID AND R.ID = E.ROLE_ID ORDER BY D.NAME;",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            startMenu()
        })
}

function viewDepartments() {
    db.query("SELECT * FROM DEPARTMENT ORDER BY NAME;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};

function viewAllRoles() {
    db.query("SELECT * FROM ROLE ORDER BY TITLE;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};
// fiew all Job titles, role id, department id and salary

function viewAllEmployees() {
    db.query("SELECT * FROM EMPLOYEE ORDER BY LAST_NAME;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
}
// employee data, employee id, first name, last name, job titles, departments, salaries and managers

function addDepartment() {
    console.log("Add Department")
    Inquirer.prompt([
        {
            type: "input",
            message: "Enter New Department: ",
            name: "department"
        }
    ]).then(function (answer) {
        db.query('INSERT INTO department')
        //insert department name

        startMenu();
    })
};

function addRole() {
    console.log("Add Role")
    Inquirer.prompt([
        {
            type: "input",
            message: "Enter New Role: ",
            name: "role"
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO role')
        //name of role, salary, department

        startMenu();
    })
};


function addEmployee() {
    console.log("Add Employee")
    Inquirer.prompt([
        {
            type: "input",
            message: "Enter New Employee: ",
            name: "employee"
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO employee')
        //first, last, role, manager

        startMenu();
    })
};

function updateEmployee() { }


startMenu()