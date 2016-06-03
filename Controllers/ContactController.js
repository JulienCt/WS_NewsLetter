var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var connect = mysql.connectToDB();

module.exports = {
    addContact: function(nom, prenom, mail, ownerUserId) {
        var deferred = Q.defer();
        connect.then(function(conn) {
          console.log(mail);
            conn.query("INSERT INTO Contact (coNom,coPrenom,coMail,coIdUser) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + ownerUserId + "')")
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    deleteContact: function(mail, ownerUserId) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("delete from Contact where coMail = '"+mail+"' and coIdUser = '"+ownerUserId+"'")
                .then(function(user) {
                    deferred.resolve(user);
                });
        })
        return deferred.promise;
    },

    addListContact: function(idUser, listContact) {
        var deferred = Q.defer();
        var queryListContact = "";
        console.log(listContact);
        for(var i = 0; i<listContact.length;i++)
        {
          queryListContact += "('"+listContact[i].coNom+"','" + listContact[i].coPrenom +"','" + listContact[i].coMail +"','"+ idUser+"'),";
        }
        console.log(queryListContact);
        queryListContact = queryListContact.slice(0, -1);
        var queryContact = "INSERT INTO Contact (coNom, coPrenom, coMail, coIdUser) VALUES " + queryListContact;
        connect.then(function(conn) {
            conn.query(queryContact)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    getListContactForUser: function(idUser) {
        var deferred = Q.defer();
        var queryContact = "SELECT * FROM Contact where coIdUser = " + idUser;
        connect.then(function(conn) {
            conn.query(queryContact)
                .then(function(listContact) {
                    deferred.resolve(listContact);
              });
        })
        return deferred.promise;
    }
}
