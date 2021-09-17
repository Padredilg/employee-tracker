const db = require('./db/connection');

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

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});