var express = require('express');
var router = express.Router();
var newsLetter = require("../Controllers/NewsLetterController.js");

/*Route Rest*/

//Créer une NewsLetter
router.post('/createNewsLetter', function(req, res, next) {
  var body =  JSON.parse(Object.keys(req.body)[0]);
  newsLetter.createNewsLetter(body).then(function(data, err) {
      res.send("OK");
  });
});

//Update d'une NewsLetter
router.post('/updateNewsLetter', function(req, res, next) {
  var body =  JSON.parse(Object.keys(req.body)[0]);
  newsLetter.updateNewsLetter(body).then(function(data, err) {
      res.send("OK");
  });
});

//Supprimer une NewsLetter
router.get('/deleteNewsLetter/:idNewsLetter', function(req, res, next) {
  newsLetter.deleteNewsLetter(req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

//Ajouter les contacts d'un groupe dans une liste de diffusion d'une newsLetter
router.get('/addGroupeToNewsLetter/:idGroupe/:idNewsLetter', function(req, res, next) {
  newsLetter.addGroupeToNewsLetter(req.params.idGroupe, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

//Ajouter un ou plusieurs contacts à la Liste de diffusion de la newsLetter  (Séparé par des virgules si plusieurs)
router.get('/addListContactToNewsLetter/:listContact/:idNewsLetter', function(req, res, next) {
  newsLetter.addListContactToNewsLetter(req.params.listContact, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

//Supprimer un ou plusieurs contact de la Liste de diffusion de la newsLetter  (Séparé par des virgules si plusieurs)
router.get('/removeListContactToNewsLetter/:listContact/:idNewsLetter', function(req, res, next) {
  newsLetter.removeListContactToNewsLetter(req.params.listContact, req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

//Retourne la liste de diffusion de la NewsLetter avec les informations associées aux contacts en plus
router.get('/getListDiffusionByNewsId/:idNewsLetter', function(req, res, next) {
  newsLetter.getListDiffusionByNewsId(req.params.idNewsLetter).then(function(listDiffusion, err) {
      res.json(listDiffusion);
  });
});

//Envoie la NewsLetter aux contacts de la liste de diffusion
router.get('/sendNewsLetter/:idNewsLetter', function(req, res, next) {
  newsLetter.sendNewsLetter(req.params.idNewsLetter).then(function(data, err) {
      res.send("OK");
  });
});

//Méthode qui permet de passer à true la propriété en base lorsque un mail est ouvert
router.get('/mailOpen/:idNewsLetter/:idContact', function(req, res, next) {
  newsLetter.mailOpen(req.params.idNewsLetter, req.params.idContact).then(function(data, err) {
      res.send("OK");
  });
});

//Désinscription d'un contact à une NewsLetter
router.get('/newsDesinscription/:idNewsLetter/:idContact', function(req, res, next) {
  newsLetter.newsDesinscription(req.params.idNewsLetter, req.params.idContact).then(function(data, err) {
      res.send("OK");
  });
});

//Méthode qui incrémente en BDD le nombre de fois où un lien a été cliqué
router.get('/clickOnLink/:idLink', function(req, res, next) {
  newsLetter.clickOnLink(req.params.idLink).then(function(data, err) {
      res.redirect(data);
  });
});

//Retourne le nombre de fois où un mail a été ouvert
router.get('/getNombreMailEnvoye/:idNewsLetter', function(req, res, next) {
  newsLetter.getNombreMailEnvoye(req.params.idNewsLetter).then(function(nbMailEnvoye, err) {
      res.send(String(nbMailEnvoye));
  });
});

//Retourne le nombre de mail ouvert d'une NewsLetter
router.get('/getNombreMailOuvert/:idNewsLetter', function(req, res, next) {
  newsLetter.getNombreMailOuvert(req.params.idNewsLetter).then(function(nbMailOuvert, err) {
      res.send(String(nbMailOuvert));
  });
});

//Retourne le nombre de fois où le lien d'une newsLetter a été cliqué
router.get('/getStatLienClique/:idNewsLetter', function(req, res, next) {
  newsLetter.getStatLienClique(req.params.idNewsLetter).then(function(nbMailOuvert, err) {
    console.log(nbMailOuvert);
      res.send(String(nbMailOuvert));
  });
});

module.exports = router;
