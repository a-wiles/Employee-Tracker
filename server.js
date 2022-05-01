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
    ])
}

function viewAll
//Department Names and Department IDs

function viewAllRoles
// fiew all Job titles, role id, department id and salary

function viewAllEmployees
// employee data, employee id, first name, last name, job titles, departments, salaries and managers

function addDepartment
//add department name

function addRole
// name of role, salary & department

function addEmployee
//add employee first, last, role, manager

function updateEmployee
// prompted to select employee to update + new role

function exit
//exit menu