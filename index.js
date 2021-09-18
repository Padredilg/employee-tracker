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
// [
//     {
//         id:1,
//         name:"saless"
//     },
//     {
//         id:2,
//         name:"financial"
//     },
// ]

// [
//     {
//         name:sales,
//         value:1
//     },
//     {
//         name:"financial",
//         value:2
//     },
// ]

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
    console.log('add Employee')
    
    action();
}

const updateEmployee = () =>{
    console.log('update Employee')
    
    action();
}

const exit = () =>{
    console.log('Thank you for your time!');
}



db.connect(err => {
    if (err) throw err;

    //start prompts
    action();
});

