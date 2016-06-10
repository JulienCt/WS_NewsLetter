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

router.get('/newsDesinscription/:idNewsLetter/:idContact', function(req, res, next) {
  newsLetter.newsDesinscription(req.params.idNewsLetter, req.params.idContact).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/clickOnLink/:idLink', function(req, res, next) {
  newsLetter.clickOnLink(req.params.idLink).then(function(data, err) {
      res.redirect(data);
  });
});

module.exports = router;
