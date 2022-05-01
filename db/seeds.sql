INSERT INTO department (name)
VALUES
('Marketing'),
('IT'),
('Finances'),
('Operations'),

INSERT INTO role (title, salary, department_id)
('Marketing' 70000, 1),
('IT Consultant', 90000, 2),
('Payroll' 60000, 3),
('Project Manager', 60000, 4),
('Cashier', 45000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dan', 'Fletcher', 1, 8),
('Mark', 'Roberts', 2, 8),
('Mandi', 'Yond', 2, 8),
('Janice', 'Albetcha', 3, NULL),
('Milo', 'Synder', 4, 8),
('Rebecca', 'Randolph', 4, 8),
('Henry', 'Chancler', 4, 8),
('Jinyoung', 'Kim', 4, NULL),


SELECT employee.role_id, role.department_id, department
FROM employee
LEFT JOIN department ON role.department_id ON employee.role_id = department.department_id.role_id
ORDER BY employee.id ;