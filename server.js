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
        } else if (choices === "View all employees") {
            viewAllEmployees();
        } else if (choices === "View all roles") {
            viewAllRoles();
        } else if (choices === "Add a department") {
            addDepartment();
        } else if (choices === "Add a role") {
            addRole();
        } else if (choices === "Add an employee") {
            addEmployee();
        } else if (choices === "Update an employees role") {
            updateEmployee();
        } else if (choices === "Exit") {
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

function viewAllEmployees() {
    console.log(viewAllEmployees);
    db.query("SELECT * FROM employee ORDER BY id;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};

function addDepartment() {
    console.log("Add Department")
    inquirer.prompt([
        {
            type: "input",
            message: "Enter New Department: ",
            name: "department"
        }
    ]).then(function (answer) {
        db.query('INSERT INTO department (name) VALUES (?);',
            answer.department, function (err, data) {
                if (err) throw err;
                console.table("Department was added")
                startMenu()

            })
    })
};

function addRole() {
    console.log("Add Role")
    var roleSql = 'SELECT * FROM department;'
    db.query(roleSql, function (err, res) {
        if (err) throw err;
        var rolesAdding = [];
        for (let i = 0; i < res.length; i++) {
            const roleAdding = { name: res[i].name, value: res[i].id }
            rolesAdding.push(roleAdding);
        }
        const rolequestions = [
            {
                type: "input",
                message: "Enter New Role Title: ",
                name: "title"
            },
            {
                type: "input",
                message: "Enter New Role's Salary: ",
                name: "salary"
            },
            {
                type: "list",
                message: "Please select a Department for the role",
                name: "department_id",
                choices: rolesAdding
            },
        ]

        inquirer.prompt(rolequestions).then(function (answer) {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
                [answer.title, answer.salary, answer.department_id], function (err, data) {
                    if (err) throw err;
                    console.table("Role has been added!")
                    startMenu()
                })
        })
    })
};

function addEmployee() {
    console.log("Add Employee")
    var empSql = 'SELECT * FROM employee;';
    db.query(empSql, function (err, res) {
        if (err) throw err;
        var addingEmps = [];
        for (let i = 0; i < res.length; i++) {
            const addingEmp = { name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id }
            addingEmps.push(addingEmp);
        }

        var roleSql = 'SELECT * FROM role;'
        db.query(roleSql, function (err, res) {
            if (err) throw err;
            var rolesAdding = [];
            for (let i = 0; i < res.length; i++) {
                const roleAdding = { name: res[i].title, value: res[i].id }
                rolesAdding.push(roleAdding);
            }
            const employeequestion = [
                {
                    type: "input",
                    message: "Enter New Employees First Name: ",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "Enter New Employees Last Name: ",
                    name: "last_name"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please choose a Role',
                    choices: rolesAdding
                },
                {
                    type: "list",
                    message: "Enter Manager",
                    name: "manager",
                    choices: addingEmps
                },
            ]

            inquirer.prompt(employeequestion).then(function (answer) {
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);',
                    [answer.first_name, answer.last_name, answer.role, answer.manager], function (err, data) {
                        if (err) throw err;
                        console.table("New Employee has been added!")
                        startMenu()
                    })
            })
        })
    })
};

function updateEmployee() {
    console.log("Updating Employee")
    var empSql = 'SELECT * FROM employee;';
    db.query(empSql, function (err, res) {
        if (err) throw err;
        var addingEmps = [];
        for (let i = 0; i < res.length; i++) {
            const addingEmp = { name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id }
            addingEmps.push(addingEmp);
        }

        var roleSql = 'SELECT * FROM role;'
        db.query(roleSql, function (err, res) {
            if (err) throw err;
            var rolesAdding = [];
            for (let i = 0; i < res.length; i++) {
                const roleAdding = { name: res[i].title, value: res[i].id }
                rolesAdding.push(roleAdding);
            }

            const updatequestions = [
                {
                    type: "list",
                    message: "Which employee would you like to adjust their role?",
                    name: "chosenemployee",
                    choices: addingEmps
                },
                {
                    type: "list",
                    message: "What role should they be reassigned?",
                    name: "chosenrole",
                    choices: rolesAdding
                }
            ]
            inquirer.prompt(updatequestions).then(function (answer) {
                db.query(`UPDATE employee (role_id) VALUES (?); WHERE VALUES (?);`,
                    [answer.employee, answer.role], function (err, data) {
                        if (err) throw err;
                        console.table("Role has been adjusted!")
                        startMenu()
                    })
            })
        })
    })
};

startMenu();