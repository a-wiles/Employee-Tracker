const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const app = express();
const sequelize = require('../config/connection');
require('console.table')

const startMenu = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'Please choose a following option',
            choices: ['View all departments',
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
        if (choices === "View all departments") {
            viewAll();
        } else if (choices === "View All Employees") {     
            viewAllEmployees();
        }else if (choices === "View all roles") {
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
            connection.end()
        };
        });

function viewAll () {};
//Department Names and Department IDs

function viewAllRoles () {};
// fiew all Job titles, role id, department id and salary

function viewAllEmployees (){};
// employee data, employee id, first name, last name, job titles, departments, salaries and managers

function addDepartment () {
console.log("Add Department")
    Inquirer.prompt([
        {
            type:"input",
            message:"Enter Department: ",
            name:"department"
        }
    ]).then(userresponse => {
        const newDepartment = new Department(userresponse.name);
        startMenu()
    })
};
//add department name

function addRole () {};
// name of role, salary & department

function addEmployee () {};
//add employee first, last, role, manager

function updateEmployee () {};
// prompted to select employee to update + new role