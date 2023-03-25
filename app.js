
// assume that we use mysql database here

const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-mysql-database'
});

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.get('/userdata', (req, res) => {
  if(req.query.id != null){
    connection.query("SELECT * FROM student WHERE student_id LIKE '%"+req.query.id+"%'",(err,result) => {
     res.render('index',{
      student:result
     });
    })
    console.log("Search!");
   }else{
    connection.query('SELECT * FROM student',(err,result) => {
     res.render('index',{
      student:result
     });
    })
    console.log("Query!");
   }
});

app.listen(4000, () => {
  console.log("Listening to port 4000")
});