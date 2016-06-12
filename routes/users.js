var express = require('express');
var router = express.Router();
var user = require("../Controllers/UserController.js");

/*Route Rest*/

//Retourne un utilisateur en fonction de son Id
router.get('/getUser/:id', function(req, res, next) {
    user.getUserById(req.params.id).then(function(user, err) {
        res.json(user);
    });
});

//Créer un utilisateur
router.get('/addUser/:nom/:prenom/:mail/:mdp', function(req, res, next) {
    user.addUser(req.params.nom,req.params.prenom,req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

//Update un utilisateur
router.get('/updateUser/:idUser/:nom/:prenom/:mail/:mdp', function(req, res, next) {
    user.updateUser(req.params.idUser, req.params.nom,req.params.prenom,req.params.mail,req.params.mdp).then(function(user, err) {
        res.send("OK");
    });
});

//Supprimer un utilisateur
router.get('/deleteUser/:mail/:mdp', function(req, res, next) {
    user.deleteUser(req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

//Vérifie le mail et le mdp d'un utilisateur
//Retourne un utilisateur
router.get('/checkUserPassword/:mail/:mdp', function(req, res, next) {
    user.checkUserPassword(req.params.mail,req.params.mdp).then(function(user, err) {
        res.json(user);
    });
});

//Retourne la liste des NewsLetters d'un utilisateur
router.get('/getListNewsLetterByUserId/:userId', function(req, res, next) {
    user.getListNewsLetterByUserId(req.params.userId).then(function(listNewsLetter, err) {
        res.json(listNewsLetter);
    });
});

//Retourne le nombre de News d'un utilisateur
router.get('/getNombreNewsByUserId/:userId', function(req, res, next) {
    user.getNombreNewsByUserId(req.params.userId).then(function(nbNews, err) {
        res.send(String(nbNews));
    });
});

//Retourne le nombre de mail envoye par un utilisateur
router.get('/getNombreMailEnvoyeByUserId/:userId', function(req, res, next) {
    user.getNombreMailEnvoyeByUserId(req.params.userId).then(function(nbMail, err) {
        res.send(String(nbMail));
    });
});

//Retourne le nombre de mail qui ont été ouvert dans les campagnes d'un utilisateur
router.get('/getNombreMailOuvertByUserId/:userId', function(req, res, next) {
    user.getNombreMailOuvertByUserId(req.params.userId).then(function(nbMail, err) {
        res.send(String(nbMail));
    });
});

//Retourne le nombre de fois où des liens ont été cliqué dans les campagnes d'un utilisateur
router.get('/getNombreLienCliqueByUserId/:userId', function(req, res, next) {
    user.getNombreLienCliqueByUserId(req.params.userId).then(function(nbLien, err) {
        res.send(String(nbLien));
    });
});


module.exports = router;
