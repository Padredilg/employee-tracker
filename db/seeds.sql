USE employee_tracker;

INSERT INTO department (name)
VALUES ('Sales'), ('Finance'), ('Engineering'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 1), 
        ('Salesperson', 80000, 1),
        ('Accountant', 125000, 2), 
        ('Lead Engineer', 250000, 3), 
        ('Legal Team Lead', 190000, 4), 
        ('Lawyer', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Luiz', 'Padredi', 3), 
        ('Giovanna', 'Bruzzi', 4);

