var express = require('express');
var router = express.Router();
var newsLetter = require("../Controllers/NewsLetterController.js");

/*Route Rest*/
router.post('/createNewsLetter', function(req, res, next) {
  var body =  JSON.parse(Object.keys(req.body)[0]);
  newsLetter.createNewsLetter(body).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/addGroupeToNewsLetter/:idGroupe/:idNewsLetter', function(req, res, next) {
  newsLetter.addGroupeToNewsLetter(req.params.idGroupe, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/addListContactToNewsLetter/:listContact/:idNewsLetter', function(req, res, next) {
  newsLetter.addListContactToNewsLetter(req.params.listContact, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/removeListContactToNewsLetter/:listContact/:idNewsLetter', function(req, res, next) {
  newsLetter.removeListContactToNewsLetter(req.params.listContact, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/sendNewsLetter/:idNewsLetter', function(req, res, next) {
  newsLetter.sendNewsLetter(req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/mailOpen/:idNewsLetter/:idContact', function(req, res, next) {
  newsLetter.mailOpen(req.params.idNewsLetter, req.params.idContact).then(function(data, err) {
      res.send("OK");
  });
});

module.exports = router;
