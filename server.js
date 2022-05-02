const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table')

//Basic menu start - based upon list selection will start functions for each choice.
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

//function to view everything in one table - include departments, employees and roles.
function viewAll() {
    db.query("SELECT D.NAME,R.TITLE,R.SALARY,E.FIRST_NAME,E.LAST_NAME,MANAGER_ID FROM DEPARTMENT D,ROLE R, EMPLOYEE E WHERE D.ID = R.DEPARTMENT_ID AND R.ID = E.ROLE_ID ORDER BY D.NAME;",
        function (err, data) {
            if (err) throw err;
            console.table(data);
            startMenu()
        })
}

//function to view only current departments by order of name
function viewDepartments() {
    db.query("SELECT * FROM DEPARTMENT ORDER BY NAME;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};

//function to view only current roles by order of title
function viewAllRoles() {
    db.query("SELECT * FROM ROLE ORDER BY TITLE;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};

//function to view only current employees by order of ID
function viewAllEmployees() {
    console.log(viewAllEmployees);
    db.query("SELECT * FROM EMPLOYEE ORDER BY ID;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startMenu()
    })
};

// Function to add new department
function addDepartment() {
    console.log("Add Department")

    //Using a prompt to insert a new department into database. If incorrect, throws error. If correct, console logs a new department. Returns to start menu.
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


//function to add a new role
function addRole() {
    console.log("Add Role")

    //Sequence to allow dynamic list to select a current department
    var role = 'SELECT * FROM department;'
        db.query(role, function (err, res) {
            if (err) throw err;
             var rolesAdding = [];
                    //for loop to ensure all departments are added, including new ones.
                    for (let i = 0; i < res.length; i++) {
                        const roleAdding = { name: res[i].name, value: res[i].id }
                        //Pushes the for loop to the choices option for current departments
                            rolesAdding.push(roleAdding);
        }
         //Questions for information to add a new role to database
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

        //Using answers from prompt to insert title, salary and department into database. If incorrect, throws error. If correct, console logs a new role. Returns to start menu.
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


// Function that adds Employee's to the table
function addEmployee() {
    console.log("Add Employee")

    //Sequence to allow dynamic list to select a current manager
    var employeeselect = 'SELECT * FROM employee;';
        db.query(employeeselect, function (err, res) {
            if (err) throw err;
             var addingEmps = [];
                        //for loop to ensure all employees are added, including new ones.
                    for (let i = 0; i < res.length; i++) {
                        const addingEmp = { name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id }
                        //Pushes the for loop to the choices option for current employees
                            addingEmps.push(addingEmp);
        }

        //Sequence to allow dynamic list to select a current role
    var roleSql = 'SELECT * FROM role;'
        db.query(roleSql, function (err, res) {
            if (err) throw err;
             var rolesAdding = [];
                        //for loop to ensure all roles are added, including new ones.
                     for (let i = 0; i < res.length; i++) {
                         const roleAdding = { name: res[i].title, value: res[i].id }
                         //Pushes the for loop to the choices option for current roles
                            rolesAdding.push(roleAdding);
            }

            //Questions for information to add new employee to database
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

            //Using answers from prompt to insert first, last, role and manager ID into database. If incorrect, throws error. If correct, console logs a new employee. Returns to start menu.
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

//Function to update a current employees role
function updateEmployee() {
    console.log("Updating Employee")

        //Sequence to allow dynamic list to select a current employees
    var employeeselect = 'SELECT * FROM employee;';
        db.query(employeeselect, function (err, res) {
            if (err) throw err;
             var addingEmps = [];
                    for (let i = 0; i < res.length; i++) {
                        const addingEmp = { name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id }
                            addingEmps.push(addingEmp);
        }

        //Sequence to allow dynamic list to select a current role
    var roleselect = 'SELECT * FROM role;'
        db.query(roleselect, function (err, res) {
            if (err) throw err;
             var rolesAdding = [];
                    for (let i = 0; i < res.length; i++) {
                        const roleAdding = { name: res[i].title, value: res[i].id }
                            rolesAdding.push(roleAdding);
            }
            //Questions for information to updated a current employee to database
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
            //Using answers from prompt to update the role for an existing employee. If incorrect, will throw error. If completed, will console log role adjusted. 
            inquirer.prompt(updatequestions).then(function (answer) {
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`,
                    [answer.chosenrole, answer.chosenemployee], function (err, data) {
                        if (err) throw err;

                        console.table("Role has been adjusted!");

                        startMenu();
                    })
            })
        })
    })
};

//Starts begining function upon npm start
startMenu();