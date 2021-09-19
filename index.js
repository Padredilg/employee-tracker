const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const action = () =>{
    inquirer.prompt(
        {//action
            type: 'list',
            name: 'action',
            message: 'What would you like to do now?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                "View total budget of a department",
                'Add a department',
                'Add a role',
                'Add an employee',
                "Update an employee's role",
                "Update an employee's manager",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                'Exit'
            ]
        }
    )
    .then(decision => {
        //check what decision is and act accordingly
        if(decision.action === 'View all departments'){
            viewDepartments();
        }
        else if(decision.action === 'View all roles'){
            viewRoles();
        }
        else if(decision.action === 'View all employees'){
            viewEmployees();
        }
        else if(decision.action === 'View employees by manager'){
            viewEmployeesByManager();
        }
        else if(decision.action === 'View employees by department'){
            viewEmployeesByDept();
        }
        else if(decision.action === "View total budget of a department"){
            viewDeptBudget();
        }
        else if(decision.action === 'Add a department'){
            addDepartment();
        }
        else if(decision.action === 'Add a role'){
            addRole();
        }
        else if(decision.action === 'Add an employee'){
            addEmployee();
        }
        else if(decision.action === "Update an employee's role"){
            updateEmployeeRole();
        }
        else if(decision.action === "Update an employee's manager"){
            updateEmployeeManager();
        }
        else if(decision.action === "Delete a department"){
            deleteDepartment();
        }
        else if(decision.action === "Delete a role"){
            deleteRole();
        }
        else if(decision.action === "Delete an employee"){
            deleteEmployee();
        }
        else{
            exit();
        }
    })
}

const viewDepartments = () =>{
    db.query('SELECT * FROM department', function(err, data){
        console.table(data);
        action();
    })
}

const viewRoles = () =>{
    db.query('SELECT * FROM role', function(err, data){
        console.table(data);
        action();
    })
}

const viewEmployees = () =>{
    db.query('SELECT * FROM employee', function(err, data){
        console.table(data);
        action();
    })
}

const viewEmployeesByManager = () => {
    const sql = `SELECT emp.id AS Emp_id,
    emp.first_name AS Emp_firstname,
    emp.last_name AS Emp_lastname,
    manager.first_name AS Manager_firstname,
    manager.last_name AS Manager_lastname
    FROM employee emp
    LEFT JOIN employee manager ON emp.manager_id = manager.id
    ORDER BY manager.id DESC`;


    db.query(sql, function(err, data){
        console.table(data);
        action();
    })
}

const viewEmployeesByDept = () => {
    const sql = `SELECT employee.id AS Emp_id,
    employee.first_name AS Emp_firstname,
    employee.last_name AS Emp_lastname,
    department.name AS Department
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY department.name DESC`;


    db.query(sql, function(err, data){
        if(err){
            console.log(err);
        }
        console.table(data);
        action();
    })
}

const viewDeptBudget = () =>{
    const sql = `SELECT department.name AS Department, 
    SUM(role.salary) AS Total_Budget
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    GROUP BY department.name`;


    db.query(sql, function(err, data){
        if(err){
            console.log(err);
        }
        console.table(data);
        action();
    })
}

const addDepartment = () =>{
    inquirer.prompt(
        {
            type: 'input',
            name: 'dept',
            message:"Enter new department's name:"
        }
    ).then((response) => {
        db.query('INSERT INTO department (name) VALUES (?)',response.dept, function(err, data){
            console.table(data);
            action();
        })
    })
}

const addRole = () =>{  
    db.query('SELECT * FROM department', function(err, deptData){
        const deptNames = deptData.map(dept => {
            return { 
                name: dept.name,
                value: dept.id
            }
        })

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message:"Enter new role's title:"
            },
            {
                type: 'input',
                name: 'salary',
                message:"Enter new role's salary:"
            },
            {
                type: 'list',
                name: 'deptid',
                message:'What department does this role belong to?',
                choices: deptNames
            }
        ]).then((response) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',[response.title, response.salary, response.deptid], function(err, data){
                console.log(response.title, 'role has been successfully added to database')
                action();
            })
        })
    })   
}

const addEmployee = () =>{
    db.query('SELECT * FROM role', function(err, roleData){
        //roleData now contains rows from role table
        db.query('SELECT * FROM employee', function(err, employeeData){
            //employeeData now contains all rows from employee table
            
            const roleNames = roleData.map(role => {
                return { 
                    name: role.title,
                    value: role.id
                }
            });

            const employeeNames = employeeData.map(employee => {
                return { 
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            });

            inquirer.prompt([
                {//first name
                    type: 'input',
                    name: 'first_name',
                    message:"Enter new employee's first name:"
                },
                {//last name
                    type: 'input',
                    name: 'last_name',
                    message:"Enter new employee's last name:"
                },
                {//role
                    type: 'list',
                    name: 'role',
                    message:"Enter new employee's role:",
                    choices: roleNames
                },
                {//confirmManager
                    type: 'confirm',
                    name: 'confirmManager',
                    message: 'Will this employee have a manager?',
                    default: true
                },
                {//chooseManager when confirmManager (list or input)
                    type: 'list',
                    name: 'chooseManager',
                    message: "Would you like to choose the manager from list or input the manager's ID?",
                    choices: [
                        'Select manager from list',
                        'Enter manager ID'
                    ],
                    when: ({confirmManager}) => {
                        if(confirmManager){
                            return true;//means ask this question
                        }
                        else{
                            return false;//means dont ask this question
                        }
                    } 
                },
                {//managerId as list when chooseManager == 'Select manager from list'
                    type: 'list',
                    name: 'managerId',
                    message: "Please select the employee's manager:",
                    choices: employeeNames,
                    when: ({chooseManager}) => {
                        if(chooseManager == 'Select manager from list'){
                            return true;//means ask this question
                        }
                        else{
                            return false;//means dont ask this question
                        }
                    }                
                },
                {//managerId as input when chooseManager == 'Enter manager ID'
                    type: 'input',
                    name: 'managerId',
                    message: "Please enter the ID of this employee's manager:",
                    when: ({chooseManager}) => {
                        if(chooseManager == 'Enter manager ID'){
                            return true;//means ask this question
                        }
                        else{
                            return false;//means dont ask this question
                        }
                    }                
                }
            ]).then((response) => {
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',[response.first_name, response.last_name, response.role, response.managerId], function(err, data){
                    console.log(response.first_name, response.last_name, 'has been successfuly added to the database')
                    action();
                })
            })
        })
    })
}

const updateEmployeeRole = () =>{
    //select an emloyee and their new role, then update that info in database
    db.query('SELECT * FROM role', function(err, roleData){
        db.query('SELECT * FROM employee', function(err, employeeData){
            
            const roleNames = roleData.map(role => {
                return { 
                    name: role.title,
                    value: role.id
                }
            });
            const employeeNames = employeeData.map(employee => {
                return { 
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            });

            inquirer.prompt([
                {//employee
                    type: 'list',
                    name: 'employee',
                    message:"Select employee to be updated:",
                    choices: employeeNames
                },
                {//newRole
                    type: 'list',
                    name: 'newRole',
                    message:"Select employee's new role:",
                    choices: roleNames
                },
            ]).then(response => {
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [response.newRole, response.employee] , function(err, data){
                    console.log('Employee was successfully updated in the database');
                    action();
                })
            })
        })
    })
}

const updateEmployeeManager = () =>{
    db.query('SELECT * FROM employee', function(err, employeeData){            
        const employeeNames = employeeData.map(employee => {
            return { 
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        });

        const employeeNames2 = [];
        for(let i=0; i<employeeNames.length; i++){
            employeeNames2.push(employeeNames[i]);
        }
        employeeNames2.push({
            name: 'No manager',
            value: null
        });

        inquirer.prompt([
            {//employee
                type: 'list',
                name: 'employee',
                message:"Select employee to be updated:",
                choices: employeeNames
            },
            {//newRole
                type: 'list',
                name: 'newManager',
                message:"Assign this employee a new manager:",
                choices: employeeNames2
            },
        ]).then(response => {
            //if manager is the same person notify mistake and call updateManager again
            if(response.employee === response.newManager){
                console.log("You cannot select an employee to be his own manager!");
                console.log("Try again");
                return updateEmployeeManager();
            }

            db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [response.newManager, response.employee] , function(err, data){
                console.log('Employee successfully updated in the database');
                action();
            })
        })
    })
}

const deleteDepartment = () =>{
    db.query('SELECT * FROM department', function(err, deptData){
            
        const deptNames = deptData.map(dept => {
            return { 
                name: dept.name,
                value: dept.id
            }
        });

        inquirer.prompt(
            {
                type: 'list',
                name: 'department',
                message:"Which department would you like to remove?",
                choices: deptNames
            }
        ).then(response => {
            db.query(`DELETE FROM department WHERE id = ?`, response.department , function(err, data){
                console.log('The department was successfully deleted from the database');
                action();
            })
        })
    })
}

const deleteRole = () =>{
    db.query('SELECT * FROM role', function(err, roleData){
            
        const roleNames = roleData.map(role => {
            return { 
                name: role.title,
                value: role.id
            }
        });

        inquirer.prompt(
            {
                type: 'list',
                name: 'role',
                message:"Which role would you like to remove?",
                choices: roleNames
            }
        ).then(response => {
            db.query(`DELETE FROM role WHERE id = ?`, response.role , function(err, data){
                console.log('The role was successfully deleted from the database');
                action();
            })
        })
    })
}

const deleteEmployee = () =>{
    db.query('SELECT * FROM employee', function(err, employeeData){
            
        const employeeNames = employeeData.map(employee => {
            return { 
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        });

        inquirer.prompt(
            {
                type: 'list',
                name: 'employee',
                message:"Which employee would you like to remove?",
                choices: employeeNames
            }
        ).then(response => {
            db.query(`DELETE FROM employee WHERE id = ?`, response.employee , function(err, data){
                console.log('The employee was successfully deleted from the database!');
                action();
            })
        })
    })
}

const exit = () =>{
    console.log('Thank you for your time!');
    process.exit(0);//exit(0) means successful stop
}


db.connect(err => {
    if (err) throw err;

    //start prompts
    action();
});

