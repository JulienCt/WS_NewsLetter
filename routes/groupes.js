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

module.exports = router;
