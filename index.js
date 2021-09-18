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
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
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
        else if(decision.action === 'Add a department'){
            addDepartment();
        }
        else if(decision.action === 'Add a role'){
            addRole();
        }
        else if(decision.action === 'Add an employee'){
            addEmployee();
        }
        
        else if(decision.action === 'Update an employee role'){
            updateEmployee();
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
    
    action();
}

const addDepartment = () =>{
    inquirer.prompt(
        {
            type: 'input',
            name: 'dept',
            message:'Type the name of the new department'
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
                message:'Type the title of the new role'
            },
            {
                type: 'input',
                name: 'salary',
                message:'Type the salary of the new role'
            },
            {
                type: 'list',
                name: 'deptid',
                message:'What department does this role belong to?',
                choices: deptNames
            }
        ]).then((response) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',[response.title, response.salary, response.deptid], function(err, data){
                console.log(response.title, 'has been added')
                action();
            })
        })
    })

    
}

const addEmployee = () =>{
    db.query('SELECT * FROM role', function(err, roleData){
        const roleNames = roleData.map(role => {
            return { 
                name: role.title,
                value: role.id
            }
        });

        db.query('SELECT * FROM employee', function(err, employeeData){
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
                    console.log(response.first_name, response.last_name, 'has been successfuly added to the employee table.')
                    action();
                })
            })
        })
    })
}

const updateEmployee = () =>{
    console.log('update Employee')
    
    action();
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

