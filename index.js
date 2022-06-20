// Main Node.js file

var express = require('express');

var bodyParser = require ('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "\\" + 'index.html');
});

var server = app.listen(3000, function(){
    console.log("port 3000");
});
