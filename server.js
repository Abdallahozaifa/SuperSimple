/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");

app.use('/modules', express.static('super-simple/modules'));
app.use('/super-simple', express.static('super-simple'));
app.use('/init.js', express.static('super-simple/init.js'));

app.use(bodyParser.urlencoded({
    extended: false
}));

/* Main Page for Slide Master */
app.get('/', function(req, res) {

    /* Sends the index html page to the user */
    fs.readFile('super-simple/game.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

/* Listens on the Server Port */
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    if(process.env.PORT){
        console.log("https://super-simple-abdallahozaifa.c9users.io/");
    }else{
        console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    }
});