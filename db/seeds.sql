USE employees_db;

INSERT INTO department(department_name)
VALUES('cast'),
      ('crew');

INSERT INTO role(title, salary, department_id)
VALUES  ('contestant', 10000, 1),
        ('judge', 100000, 1),
        ('camera operator', 50000, 2),
        ('pit crew', 100000, 1),
        ('grip', 30000, 2),
        ('handler', 40000, 2),
        ('executive producer', 200000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('RuPaul', 'Charles', 7, 1),
        ('Michelle', 'Visage', 2, 1),
        ('Jinkx', 'Monsoon', 1, 1),
        ('Sasha', 'Velour', 1, 1),
        ('Santino', 'Rice', 2, 1),
        ('Ross', 'Mathews', 2, 1),
        ('Raja', 'Gemini', 1, 1),
        ('Bryce', 'Ellenberg', 4, 1),
        ('John', 'Doe', 3, 1),
        ('Jane', 'Doe', 5, 1),
        ('Chelsea', 'Handler', 6, 1);



    