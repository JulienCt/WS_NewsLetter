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

router.post('/updateNewsLetter', function(req, res, next) {
  var body =  JSON.parse(Object.keys(req.body)[0]);
  newsLetter.updateNewsLetter(body).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/deleteNewsLetter/:idNewsLetter', function(req, res, next) {
  newsLetter.deleteNewsLetter(req.params.idNewsLetter).then(function(data, err) {
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

router.get('/getListDiffusionByNewsId/:idNewsLetter', function(req, res, next) {
  newsLetter.getListDiffusionByNewsId(req.params.idNewsLetter).then(function(listDiffusion, err) {
      res.json(listDiffusion);
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

router.get('/getNombreMailEnvoye/:idNewsLetter', function(req, res, next) {
  newsLetter.getNombreMailEnvoye(req.params.idNewsLetter).then(function(nbMailEnvoye, err) {
      res.send(String(nbMailEnvoye));
  });
});

router.get('/getNombreMailOuvert/:idNewsLetter', function(req, res, next) {
  newsLetter.getNombreMailOuvert(req.params.idNewsLetter).then(function(nbMailOuvert, err) {
      res.send(String(nbMailOuvert));
  });
});

router.get('/getStatLienClique/:idNewsLetter', function(req, res, next) {
  newsLetter.getStatLienClique(req.params.idNewsLetter).then(function(nbMailOuvert, err) {
    console.log(nbMailOuvert);
      res.send(String(nbMailOuvert));
  });
});

module.exports = router;
