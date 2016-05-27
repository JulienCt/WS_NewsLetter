var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var connect = mysql.connectToDB();

module.exports = {
    createGroupe: function(nom, description, idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("INSERT INTO Groupe (grNom,grDescription,grIdUser) VALUES ('" + nom + "','" + description + "','" + idUser + "')")
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    deleteGroupe: function(idGroupe) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("delete from Groupe where grId = '"+idGroupe+"'")
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    }
}
