var express = require('express');
var router = express.Router();
var contact = require("../Controllers/ContactController.js");

/*Route Rest*/
router.get('/addContact/:nom/:prenom/:mail/:ownerUserId', function(req, res, next) {
    contact.addContact(req.params.nom,req.params.prenom,req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

router.get('/deleteContact/:mail/:ownerUserId', function(req, res, next) {
    contact.deleteContact(req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

router.post('/addListContact', function(req, res, next) {
  contact.addListContact(req.body.idUser,req.body.Contact).then(function(data, err) {
      res.send("OK");
  });
});

router.get('/getListContactForUser/:userId', function(req, res, next) {
    contact.getListContactForUser(req.params.userId).then(function(listContact, err) {
        res.send(listContact);
    });
});

module.exports = router;
