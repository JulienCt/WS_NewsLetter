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
            conn.query("select usId from User where usMail = '" +mail+ "' and '"+mdp+"'")
                .then(function(userId) {
                  if (userId.length > 0) {
                      deferred.resolve(userId);
                  }else {
                      deferred.resolve("User not found");
                  }
                });
        })
        return deferred.promise;
    }
}
