var express = require('express');
var router = express.Router();
var momCtrl = require('../controllers/mom.server.controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
  return momCtrl.list(req,res);
});

/*Get New Note Page*/
router.get('/newnote',function(req,res){
  return momCtrl.getNote(req,res);
});

/*Get Filtered Note*/
router.post('/',function(req,res){
  return momCtrl.filterByMember(req,res);
});
/*Save new note*/
router.post('/newnote',function(req,res){
  return momCtrl.create(req,res);
});
module.exports = router;
