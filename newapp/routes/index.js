var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.pug', { title: 'Express' });
});

router.get('/helloworld', (req, res, next) => {
  res.render('helloworld', { title: 'Hello world' });
});

router.get('/studentlist', (req, res) => {
  var db = req.db;//JE RECUPERE db
  var collection = db.get("students");
  collection.find({}, {}, function (e, docs) {
    res.render('studentlist', { studentlist: docs });
  });
});

router.get('/addstudent', (req, res, next) => {
  res.render('newstudent', { title: 'Add new student' });
});

router.post('/adduser', function (req, res) {
  var db = req.db;
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var collection = db.get('students');
  // Submit to the DB
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function (err, doc) {
    if (err) {
      res.send("problem adding info to the database.");
    }
    else {
      res.redirect("studentlist");
    }
  });
});

module.exports = router;
