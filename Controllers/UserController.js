var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var crypto = require('crypto');
var connect = mysql.connectToDB();

module.exports = {
    addUser: function(nom, prenom, mail, mdp) {
        var deferred = Q.defer();
        var mdpMD5 = crypto.createHash('md5').update(mdp).digest("hex");
        connect.then(function(conn) {
            conn.query("INSERT INTO User (usNom,usPrenom,usMail,usMotDePasse) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + mdpMD5 + "')")
                .then(function(user) {
                    deferred.resolve(user);
                });
        })
        return deferred.promise;
    },

    updateUser: function(idUser, nom, prenom, mail, mdp) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("UPDATE User SET usNom = '" + nom + "', usPrenom = '" + prenom + "',usMail ='"+ mail +"', usMotDePasse = '"+ mdp +"' WHERE usId = " + idUser)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    deleteUser: function(mail, mdp) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("DELETE FROM User WHERE usMail = '"+mail+"' and usMotDePasse = '"+mdp+"'")
                .then(function(data) {
                    deferred.resolve(data);
                });
        })
        return deferred.promise;
    },

    getUserById: function(id) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT * FROM User WHERE usId = "+id+"")
                .then(function(user) {
                    deferred.resolve(user);
                });
        })
        return deferred.promise;
    },

    checkUserPassword: function(mail, mdp) {
        var deferred = Q.defer();
        var mdpMD5 = crypto.createHash('md5').update(mdp).digest("hex");
        connect.then(function(conn) {
            conn.query("select usId from User where usMail = '" +mail+ "' and usMotDePasse = '"+mdpMD5+"'")
                .then(function(userId) {
                  if (userId.length > 0) {
                      deferred.resolve(userId[0]);
                  }else {
                      deferred.resolve("User not found");
                  }
                });
        })
        return deferred.promise;
    },

    getListNewsLetterByUserId: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT * FROM NewsLetter WHERE neUserId = "+ idUser)
                .then(function(listNewsLetter) {
                  deferred.resolve(listNewsLetter);
                });
        })
        return deferred.promise;
    },

    getNombreNewsByUserId: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT COUNT(*) AS nbNews FROM NewsLetter WHERE neUserId = "+ idUser)
                .then(function(count) {
                  deferred.resolve(count[0].nbNews);
                });
        })
        return deferred.promise;
    },

    getNombreMailEnvoyeByUserId: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT COUNT(*) AS nbMail FROM ListeDiffusion, NewsLetter WHERE liEnvoye = 1 AND neId = liNewsLetterId AND neUserId = "+ idUser)
                .then(function(count) {
                  deferred.resolve(count[0].nbMail);
                });
        })
        return deferred.promise;
    },

    getNombreMailOuvertByUserId: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT COUNT(*) AS nbMail FROM ListeDiffusion, NewsLetter WHERE liOuvert = 1 AND neId = liNewsLetterId AND neUserId = "+ idUser)
                .then(function(count) {
                  deferred.resolve(count[0].nbMail);
                });
        })
        return deferred.promise;
    },

    getNombreLienCliqueByUserId: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT SUM(linOuvert) AS nbLinkOpen FROM Link, NewsLetter WHERE linId = neId AND neUserId = "+ idUser)
                .then(function(count) {
                  deferred.resolve(count[0].nbLinkOpen);
                });
        })
        return deferred.promise;
    }

}
