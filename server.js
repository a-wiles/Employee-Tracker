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