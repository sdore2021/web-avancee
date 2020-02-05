var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld',(req,res,next)=>{
  res.render('helloworld', { title: 'Hello world' });
});

router.get('/studentlist',(req,res)=>{
  var db = req.db;//JE RECUPERE db
  var collection = db.get("students");
  collection.find({},{},function(e,docs){
    res.render('studentlist',{studentlist : docs});
  });
});


module.exports = router;
