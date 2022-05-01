const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const app = express();
const sequelize = require('../config/connection');
require('console.table')

