var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Created some dummy data //
// var dummyPost = new Post({
//   text: 'hello'
// });
// var dummyComment = {
//   text: 'bye',
//   user: 'Bob'
// };
// dummyPost.comments.push(dummyComment);
// dummyPost.save();

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', function (request, response) {
  Post.find({}, function (err, res) {
    if (err) { return console.log(err) }
    response.send(res);
  });
});

// 2) to handle adding a post
app.post('/posts', function (request, response) {
  var newPost = new Post(request.body);
  newPost.save(function (err, res){
    if (err) { return console.log(err) }
    response.send(res);
  });
});

// 3) to handle deleting a post
app.delete('/posts/:postId', function(request, response) {
  Post.findByIdAndRemove(request.params.postId, function (err, res){
    if (err) { return console.log(err) }
    response.send(res);
  });
});
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(8000, function () {
  console.log("what do you want from me! get me on 8000 ;-)");
});
