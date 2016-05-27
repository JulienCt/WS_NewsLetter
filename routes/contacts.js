var express = require('express');
var router = express.Router();
var user = require("../Controllers/ContactController.js");

/*Route Rest*/
router.get('/addContact/:nom/:prenom/:mail/:ownerUserId', function(req, res, next) {
    user.addContact(req.params.nom,req.params.prenom,req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

router.get('/deleteContact/:mail/:ownerUserId', function(req, res, next) {
    user.deleteContact(req.params.mail,req.params.ownerUserId).then(function(data, err) {
        res.send("OK");
    });
});

module.exports = router;
