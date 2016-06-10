var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/*',function(req,res,next){
    res.header('X-XSS-Protection' , 0 );
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.post('/*',function(req,res,next){
    res.header('X-XSS-Protection' , 0 );
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
module.exports = router;
