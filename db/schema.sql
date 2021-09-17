

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    -- department_id must use foreign key - hold ref to dep
)

CREATE TABLE employee (
    id INTEGER PRIMARY KEY
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    -- role_id INTEGER hold ref to role
    
    -- manager_id INTEGER hold ref to another employee that is
    -- the manager of this employee. Might be NULL if no manager
)
