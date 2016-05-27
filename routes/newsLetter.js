var express = require('express');
var router = express.Router();
var newsLetter = require("../Controllers/NewsLetterController.js");

/*Route Rest*/
router.post('/createNewsLetter', function(req, res, next) {
  newsLetter.createNewsLetter(req.body).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/addGroupeToNewsLetter/:idGroupe/:idNewsLetter', function(req, res, next) {
  newsLetter.addGroupeToNewsLetter(req.params.idGroupe, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

module.exports = router;
