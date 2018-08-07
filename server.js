var allData;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const url =require('url');
const request = require('request');
const mysql = require('mysql');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tablice"
  });
  // res.sendfile("./data/data.json");
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tablice", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});
// request.get('http://127.0.0.1:3000',function(err,res,body){
//   if(err){
//     console.log(err);
//   }
//   if(res.statusCode !== 200 ){
//   console.log(body);
//   }
// });
// console.log(allData);

app.post('/addTable',function(req,res){
  request('http://127.0.0.1:3000', function (error, response, body) {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "tablice"
    });
    // console.log('body:', body); // Print the HTML for the Google homepage.
    var name=req.body.name;
    var index=req.body.index;
    console.log("User name = "+name);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO tablice (tb_name, tb_index) VALUES ('"+name+"',"+index+")";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
  });
});

app.post('/deleteTable',function(req,res){
  request('http://127.0.0.1:3000', function (error, response, body) {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "tablice"
    });
    // console.log('body:', body); // Print the HTML for the Google homepage.
    var id=req.body.id;
    console.log("id = "+id);
    con.connect(function(err) {
      if (err) throw err;
      var sql = "DELETE FROM tablice WHERE tb_id ="+id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
      });
    });
  });
});
app.post('/updateTable',function(req,res){
  request('http://127.0.0.1:3000', function (error, response, body) {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "tablice"
    });
    // console.log('body:', body); // Print the HTML for the Google homepage.
    var id=req.body.id;
    var name=req.body.name;
    console.log("id = "+id+" Name:"+name);
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE tablice SET tb_name = '"+name+"' WHERE tb_id ="+id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
    });
  });
});
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
function savePersonToPublicFolder(data, callback) {
  fs.writeFile('./data/data.json', data, callback);
  console.log('uploaded');
};
