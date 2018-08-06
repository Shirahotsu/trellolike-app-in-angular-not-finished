var allData;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const url =require('url');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.sendfile("./data/data.json");
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

app.post('/login',function(req,res){
  request('http://127.0.0.1:3000', function (error, response, body) {
    // console.log('body:', body); // Print the HTML for the Google homepage.
    allData = body;
    allData = JSON.parse(allData)
    console.log(allData);
    var id=req.body.id;
    var name=req.body.name;
    console.log("Id="+id+"User name = "+name);
    let data ={
      id: id,
      name: name
    }
    allData.push(data);
    allData = JSON.stringify(allData);
    savePersonToPublicFolder(allData);
    res.end("yes");
  });
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
function savePersonToPublicFolder(data, callback) {
  fs.writeFile('./data/data.json', data, callback);
  console.log('uploaded');
};
