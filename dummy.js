var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var post1 = new Post({text: "This is my first post!"}),
post2 = new Post ({text: "What nice weather in Tel Aviv"}),
post3 = new Post ({text: "How hard is this going to be?"});

post1.comments.push({text: "Kol hakavod!", user: "Mr. Magoo"});
post1.comments.push({text: "Until 120", user: "Joe"});

post2.comments.push({text: "If you like it hot", user: "Mr. Magoo"});
post2.comments.push({text: "Shvitz away!", user: "Moe"});
post2.comments.push({text: "Enjoy", user: "Larry"});

post3.comments.push({text: "Piece of cake", user: "Curly"});

post1.save();
post2.save();
post3.save();

