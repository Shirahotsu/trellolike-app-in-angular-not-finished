const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const url =require('url');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.sendfile("./tmp/index.html");
});
app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  savePersonToPublicFolder(user_name);
  res.end("yes");
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
function savePersonToPublicFolder(person, callback) {
  fs.writeFile('./src/assets/data/data.json', person, callback);
  console.log('uploaded');
};
