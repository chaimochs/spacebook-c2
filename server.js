var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/posts", function (req, res) {
  Post.find({}, function (err, allPosts) {
    if (err) {
      console.log(err);
    } else {
      res.send(allPosts);
    }
  });
});

app.post("/posts", function (req, res) {
  if (!req) {
    console.log("Error receiving post");
  }
  var newPost = new Post(req.body);
  newPost.save(function (err, response) {
    if (err) {
      console.error(err);
    }
    res.send({id: response.id, text: "saved"});
  });
});

app.delete("/delete/:id", function (req, res) {
  if (!req) {
    console.log("Error");
  }
  Post.findByIdAndRemove(req.params.id, function(err, dleted){
    if(err){
    console.error(err);
    }
  }); 
  res.send("Deleted");  
});

app.post("/posts/:id/comments", function (req, res){
      newId  = req.params.id;
      newComment = {text: req.body.text, user: req.body.user};
      Post.findByIdAndUpdate(newId, { $push: { comments: newComment }}, { "new": true }, function (err, saved) {
        if (err) {
          res.send(err);
        }
        var commentNum = saved.comments[saved.comments.length-1]._id;
        res.send({id: commentNum, text: "Done"})
      })
  });

app.delete("/posts/del-comment/:id/:comment_id", function (req, res){
           
  id = req.params.id;
  comment_id = req.params.comment_id;
  
  Post.update({ _id: id},{$pull: { comments : {_id : comment_id} } },function (err, res1) {
  if(err)
    res.send(err)
  else    
    res.send("Deleted")
  })
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});