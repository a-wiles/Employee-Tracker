// const Sequelize = require('sequelize');
require('dotenv').config();
const mysql = require("mysql2")
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
})


// create connection to our env
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3001
// });

connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Employee tracker")
    // startMenu();
})

module.exports = connection;