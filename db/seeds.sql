USE employees;

-- INSERT INTO department (name)
-- VALUES
-- ('Marketing'),
-- ('IT'),
-- ('Finances'),
-- ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing', 7000, 1),
('IT Consultant', 9000, 2),
('Payroll', 6000, 3),
('Project Manager', 6000, 4),
('Cashier', 4500, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dan', 'Fletcher', 1, 8),
('Mark', 'Roberts', 2, 8),
('Mandi', 'Yond', 2, 8),
('Janice', 'Albetcha', 3, NULL),
('Milo', 'Synder', 4, 8),
('Rebecca', 'Randolph', 4, 8),
('Henry', 'Chancler', 4, 8),
('Jinyoung', 'Kim', 4, NULL);


