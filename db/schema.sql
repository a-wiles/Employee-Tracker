DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL,
    department_id INT,
     CONSTRAINT FK_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY  AUTO_INCREMENT,
    first_name VARCHAR (40),
    last_name VARCHAR (40),
    role_id INT,
    manager_id INT  references employee(id) 
    ON DELETE SET NULL,
    CONSTRAINT FK_role FOREIGN KEY (role_id) REFERENCES role(id)
    
);