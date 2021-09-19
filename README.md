# Employee Tracker
<a href='https://opensource.org/licenses/MIT'>[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)</a>
  
## Table of Contents
[Description](#Description)</br>
[Installation](#Installation)</br>
[Usage](#Usage)</br>
[License](#License)</br>
[Questions](#Questions)

## Description
The purpose of this application is to help a company to keep track of their departments, roles, employees, and all of the information related to each of them.

## Installation
To run this app for the first time, the user must clone it to their local repo and then run the following commands: 
- npm i
- npm install console.table --save
- npm install inquirer 
- npm install dotenv
- npm install --save mysql2
- </br>
You will need MySQL installed in your local machine, as well as a personal MySQL account. After installing all required packages, make sure to create a .env file, add the following variables to it and include your password on DB_PASS:
- DB_NAME='localhost'
- DB_USER='root'
- DB_PASS='*your password*'
</br>
You will then be ready to go.

## Usage
Before anything you want to make sure that you are using the correct database. If this will be your first time using the app, run the command "SOURCE db/schema.sql" to create the database, start using it, and also populate it with tables. You may run "SOURCE db/seeds.sql for some generic departments, roles, and employees that can be used for examples. Once the database is set up, run "npm start" to initialize the application and you will be prompted about what to do. You may select an option from the list of actions and follow from there. The options included in the list are as follows:
- View all departments
- View all roles
- View all employees
- View employees by manager
- View employees by department
- View total budget of a department
- Add a department
- Add a role
- Add an employee
- Update an employee's role
- Update an employee's manager
- Delete a department
- Delete a role
- Delete an employee
- Exit
 </br>
 You may end the application by choosing Exit from the list of actions, or by pressing CTRL + C.
 </br></br>
 _Walkthrough video of the app_:
 </br>
 
https://user-images.githubusercontent.com/85601336/133915274-c039ca24-0dcd-4cfc-b9fb-59b413527d4e.mp4

## License
This application is covered under the <a href='https://opensource.org/licenses/MIT'>MIT License</a>

## Questions
<a href='https://github.com/Padredilg'>Padredilg</a></br>
If you have any questions, you may email at padredilg@knights.ucf.edu
