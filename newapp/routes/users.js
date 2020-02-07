var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.get('/studentlist', function (req, res) {
  var db = req.db;//JE RECUPERE db
  var collection = db.get("students");
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
});

router.post('/addstudent', function (req, res) {
  var db = req.db;//JE RECUPERE db
  var collection = db.get("students");
  collection.insert({
    'username': req.body.username, 'email': req.body.email,
    'fullname': req.body.fullname, 'age': req.body.age,
    'location': req.body.location, 'gender': req.body.gender
  });
  res.send('new student inserted in database');
});

router.delete('/deletestudent/:id', function (req, res) {
  var db = req.db
  var collection = db.get("students");
  var studentToDelete = req.params.id;//Notez comment récupérer la valeur de id
  collection.remove({ '_id': studentToDelete }, function (err) {
    res.send((err === null) ? { msg: req.params } : { msg: 'error: ' + err });
  });
});


module.exports = router;
