const inquirer = require('inquirer');
const db = require('./db/connection');

const action = () =>{
    inquirer.prompt(
        {//action
            type: 'list',
            name: 'action',
            message: 'What would you like to do now?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'end application'
            ]
        }
    )
    .then(decision => {
        //check what decision is and act accordingly
        if(decision.action === 'view all departments'){
            viewDepartments();
        }
        else if(decision.action === 'view all roles'){
            viewRoles();
        }
        else if(decision.action === 'view all employees'){
            viewEmployees();
        }
        else if(decision.action === 'add a department'){
            addDepartment();
        }
        else if(decision.action === 'add a role'){
            addRole();
        }
        else if(decision.action === 'add an employee'){
            addEmployee();
        }
        
        else if(decision.action === 'update an employee role'){
            updateEmployee();
        }
        else{
            endApp();
        }
    })
}

const viewDepartments = () =>{
    console.log('show all departments')
        .then(() => {
            action();
        });
}

const viewRoles = () =>{
    console.log('show all Roles')
        .then(() => {
            action();
        });
}

const viewEmployees = () =>{
    console.log('show all Employees')
        .then(() => {
            action();
        });
}

const addDepartment = () =>{
    console.log('add department')
        .then(() => {
            action();
        });
}

const addRole = () =>{
    console.log('add Role')
        .then(() => {
            action();
        });
}

const addEmployee = () =>{
    console.log('add Employee')
        .then(() => {
            action();
        });
}

const updateEmployee = () =>{
    console.log('update Employee')
        .then(() => {
            action();
        });
}

const endApp = () =>{
    console.log('Thank you for your time!');
}



db.connect(err => {
    if (err) throw err;

    //start prompts
    action();
});

//create prompts
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