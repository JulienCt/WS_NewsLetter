var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var connect = mysql.connectToDB();

module.exports = {
    addUser: function(nom, prenom, mail, mdp) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("INSERT INTO User (usNom,usPrenom,usMail,usMotDePasse) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + mdp + "')")
                .then(function(user) {
                    deferred.resolve(user);
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
        connect.then(function(conn) {
            conn.query("select usMotDePasse from User where usMail = '" +mail+ "'")
                .then(function(mdpUser) {
                  if (mdpUser[0].usMotDePasse == mdp) {
                      deferred.resolve(true);
                  }else {
                      deferred.resolve(false);
                  }
                });
        })
        return deferred.promise;
    }
}
