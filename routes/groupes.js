var express = require('express');
var router = express.Router();
var user = require("../Controllers/GroupeController.js");

/*Route Rest*/
router.get('/createGroupe/:nom/:description/:idUser', function(req, res, next) {
    user.createGroupe(req.params.nom, req.params.description, req.params.idUser).then(function(data, err) {
        res.send("OK");
    });
});

router.get('/deleteGroupe/:idGroupe', function(req, res, next) {
    user.deleteGroupe(req.params.idGroupe).then(function(data, err) {
        res.send("OK");
    });
});

router.get('/addContactToGroupe/:idGroupe/:listContactId', function(req, res, next) {
    user.addContactToGroupe(req.params.idGroupe, req.params.listContactId).then(function(data, err) {
        res.send("OK");
    });
});

router.get('/getGroupesForUser/:idUser', function(req, res, next) {
    user.getGroupesForUser(req.params.idUser).then(function(listGroupe, err) {
        res.send(listGroupe);
    });
});

module.exports = router;
