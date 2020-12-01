const { response } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')

//SQL connection
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyDatabaseforMyProjects@',
  database: 'crud_db'
})
conn.connect(function (err, rows, fields) {
  if (err) throw err
  console.log('Connected to MySQL..')

})


/* GET home page. */
// MySQL Record fetch Code
router.get('/', function(req, res, next) {
  var query = 'SELECT * FROM user_form';
  conn.query(query, function(err, rows, fields){
    if(err) throw err;
   // res.json(rows);
    res.render('index',{title: "Index", Products: rows} );
  });
  
});

// create page route
router.get('/create', function(req, res, next) {
  res.render('create');
  console.log(req.body)
});

// create page route
router.post('/create', function(req, res, next) {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email : req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
 conn.query(`INSERT INTO user_form set ?`, [data], function(err, result){
   if(err) {console.log(err)}
   else{
      return res.redirect('/');
   } 
 })
});

// edit page route
//router.get('/editform', function(req, res, next) {
  //res.render('editform');
//});

router.get('/editform/:id', function(req, res, next) {
 var id = req.params.id;
 var sql = `SELECT * FROM user_form WHERE id=${id}`;
 conn.query(sql, function(err, rows, fields) {
  res.render('editform', {title: 'Update User', Products: rows[0]});
 })
});



// send updated record frome edit page
router.post('/editform/:id', function(req, res, next) {
   var first_name= req.body.first_name;
   var last_name= req.body.last_name;
   var email = req.body.email;
   var password= req.body.password;
   var phone= req.body.phone;
   var id = req.params.id;
   var sql =  `UPDATE user_form SET first_name="${first_name}", last_name="${last_name}", email="${email}", password="${password}", phone="${phone}" WHERE id=${id}`;
    conn.query(sql, function(err, result){
     if(err) {console.log(err)}
     else{
       res.redirect('editform');
   } 
 })
});






module.exports = router;
