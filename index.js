const inquirer = require('inquirer');
const db = require('./db/connection');

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
    console.log('show all departments')
    
    action();
}

const viewRoles = () =>{
    console.log('show all Roles')
    
    action();
}

const viewEmployees = () =>{
    console.log('show all Employees')
    
    action();
}

const addDepartment = () =>{
    console.log('add department')
    
    action();
}

const addRole = () =>{
    console.log('add Role')
    
    action();
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

// const cTable = require('console.table');
// const table = cTable.getTable([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);