var express = require('express');
var router = express.Router();
var user = require("../Controllers/UserController.js");

/*Route Rest*/
router.get('/getUser/:id', function(req, res, next) {
    user.getUserById(req.params.id).then(function(user, err) {
        res.json(user);
    });
});

router.get('/addUser/:nom/:prenom/:mail/:mdp', function(req, res, next) {
    user.addUser(req.params.nom,req.params.prenom,req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

router.get('/deleteUser/:mail/:mdp', function(req, res, next) {
    user.deleteUser(req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

router.get('/checkUserPassword/:mail/:mdp', function(req, res, next) {
    user.checkUserPassword(req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

module.exports = router;
