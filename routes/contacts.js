var express = require('express');
var router = express.Router();
var contact = require("../Controllers/ContactController.js");

/*Route Rest*/

//Ajoute un contact
router.get('/addContact/:nom/:prenom/:mail/:ownerUserId', function(req, res, next) {
    contact.addContact(req.params.nom,req.params.prenom,req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

//Update un contact
router.get('/updateContact/:idContact/:nom/:prenom/:mail', function(req, res, next) {
    contact.updateContact(req.params.idContact, req.params.nom,req.params.prenom,req.params.mail).then(function(data, err) {
        res.send("OK");
    });
});

//Delete Contact
router.get('/deleteContact/:mail/:ownerUserId', function(req, res, next) {
    contact.deleteContact(req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

//Ajoute une liste de contact à un utilisateur (csv)
router.post('/addListContact', function(req, res, next) {
  var body =  JSON.parse(Object.keys(req.body)[0]);
  contact.addListContact(body.idUser, body.Contact).then(function(data, err) {
      res.send("OK");
  });
});

//Retourne la liste de contact d'un utilisateur
router.get('/getListContactForUser/:userId', function(req, res, next) {
    contact.getListContactForUser(req.params.userId).then(function(listContact, err) {
        res.send(listContact);
    });
});

module.exports = router;
