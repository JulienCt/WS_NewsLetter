var express = require('express');
var router = express.Router();
var groupe = require("../Controllers/GroupeController.js");

/*Route Rest*/

//Crée un groupe
router.get('/createGroupe/:nom/:description/:idUser', function(req, res, next) {
    groupe.createGroupe(req.params.nom, req.params.description, req.params.idUser).then(function(data, err) {
        res.send("OK");
    });
});

//Supprimer un groupe
router.get('/deleteGroupe/:idGroupe', function(req, res, next) {
    groupe.deleteGroupe(req.params.idGroupe).then(function(data, err) {
        res.send("OK");
    });
});

//Ajouter un ou plusieurs contacts à un groupe (Séparé par des virgules si plusieurs)
router.get('/addContactToGroupe/:idGroupe/:listContactId', function(req, res, next) {
    groupe.addContactToGroupe(req.params.idGroupe, req.params.listContactId).then(function(data, err) {
        res.send("OK");
    });
});

//Supprimer un contact d'un groupe
router.get('/deleteContactToGroupe/:idGroupe/:contactId', function(req, res, next) {
    groupe.deleteContactToGroupe(req.params.idGroupe, req.params.contactId).then(function(data, err) {
        res.send("OK");
    });
});

//Retourne les groupes d'un utilisateur
router.get('/getListGroupesForUser/:idUser', function(req, res, next) {
    groupe.getListGroupesForUser(req.params.idUser).then(function(listGroupe, err) {
        res.send(listGroupe);
    });
});

//Retourne les contacts d'un groupe
router.get('/getListContactForGroupe/:groupeId', function(req, res, next) {
    groupe.getListContactForGroupe(req.params.groupeId).then(function(listContact, err) {
        res.send(listContact);
    });
});

module.exports = router;
