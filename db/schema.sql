DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE employee (
    id PRIMARY KEY INTEGER AUTOINCREMENT,
    first_name VARCHAR (40),
    last_name VARCHAR (40),
    role_id INTEGER,
    manager_id INTEGER NULL
);

CREATE TABLE department (
    id PRIMARY KEY INTEGER AUTOINCREMENT,
    name VARCHAR(40)
);

CREATE TABLE role (
    id PRIMARY KEY INTEGER AUTOINCREMENT,
    title VARCHAR(40),
    salary DECIMAL,
    department_id INTEGER
)