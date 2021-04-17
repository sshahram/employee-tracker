INSERT INTO department (name)
VALUE
('Mechanical'),
('Test'),
('QA'),
('Shipping'),
('Stockroom'),
('SMT'),
('2_OP');

INSERT INTO role (title, salary, department_id)
VALUES
('Assembler', 100, 1),
('Technician', 300, 2),
('Inspector', 200, 3),
('Mover', 100, 4),
('Material Handler', 150.5, 5),
('Operator', 105.6, 6),
('Engineer', 400, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Lin', 7, NULL),
('Carlos', 'Dominguez', 4, 1),
('Jasan', 'Hernandez', 6, 2),
('Elizabeth', 'Tracy', 6, 1),
('Jeff', 'Ferrel', 7, NULL);