var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');

module.exports = {
    addUser: function(nom, prenom, mail, mdp) {
        var deferred = Q.defer();
        mysql.connectToDB().then(function(conn) {
            conn.query("INSERT INTO User (usNom,usPrenom,usMail,usMotDePasse) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + mdp + "')")
                .then(function(user) {
                    deferred.resolve(user);
                });
        })
        return deferred.promise;
    },
    getUserById: function(id) {
        var deferred = Q.defer();
        mysql.connectToDB().then(function(conn) {
            conn.query("SELECT * FROM User WHERE usId = "+id+"")
                .then(function(user) {
                    deferred.resolve(user);
                });
        })
        return deferred.promise;
    }
}
