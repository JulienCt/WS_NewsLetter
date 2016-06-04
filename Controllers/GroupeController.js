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
    },

    addContactToGroupe: function(idGroupe, listContactId) {
        var deferred = Q.defer();
        var arrayUserId = listContactId.split(",");
        var queryListContact = "";
        for(var i = 0; i<arrayUserId.length;i++)
        {
          queryListContact += "('"+idGroupe+"','" + arrayUserId[i]+"'),";
        }
        queryListContact = queryListContact.slice(0, -1);
        connect.then(function(conn) {
            conn.query("INSERT INTO GroupeContact VALUES "+queryListContact)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    getListGroupesForUser: function(idUser) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT * FROM Groupe WHERE grIdUser = "+idUser)
                .then(function(listGroupe) {
                    deferred.resolve(listGroupe);
                });
        })
        return deferred.promise;
    },

    getListContactForGroupe: function(idGroupe) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT coId, coNom, coPrenom, coMail, coIdUser FROM GroupeContact, Contact WHERE gcGroupeId = "+idGroupe + " and gcContactId = coId")
                .then(function(listContact) {
                    deferred.resolve(listContact);
                });
        })
        return deferred.promise;
    }
}
