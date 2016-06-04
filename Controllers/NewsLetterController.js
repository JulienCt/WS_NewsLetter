var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var connect = mysql.connectToDB();

module.exports = {
    createNewsLetter: function(news) {
        var deferred = Q.defer();
        console.log(news);
        connect.then(function(conn) {
            if (news.UrlLink != "") {
                conn.query("INSERT INTO Link (linMd5, linUrl, linOuvert) VALUES ('MD5', '" + news.UrlLink + "', '0')")
                    .then(function() {
                        conn.query("INSERT INTO NewsLetter (neTitre, neTextContent, neUrlImage, neLinkId, neUserId) VALUES ('" + news.neTitre + "', '" + news.neTextContent + "', '" + news.neUrlImage + "', '" + news.neLinkId + "', '" + news.neUserId + "')")
                            .then(function() {
                                deferred.resolve();
                            });
                    });
            } else {
                conn.query("INSERT INTO NewsLetter (neTitre, neTextContent, neUrlImage, neUserId) VALUES ('" + news.neTitre + "', '" + news.neTextContent + "', '" + news.neUrlImage + "','" + news.neUserId + "')")
                    .then(function() {
                        deferred.resolve();
                    });
            }
        })
        return deferred.promise;
    },

    addGroupeToNewsLetter: function(idGroupe, idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT gcContactId FROM GroupeContact WHERE gcGroupeId = " + idGroupe)
                .then(function(listContact) {
                    var queryList = "";
                    for (var i = 0; i < listContact.length; i++) {
                        queryList += "('" + listContact[i].gcContactId + "','" + idNewsLetter + "','0'),";
                    }
                    console.log(queryList);
                    queryList = queryList.slice(0, -1);
                    conn.query("INSERT INTO ListeDiffusion (liContactId, liNewsLetterId, liEnvoye) VALUES " + queryList)
                        .then(function() {
                            deferred.resolve();
                        });
                });
        })
        return deferred.promise;
    },

    addListContactToNewsLetter: function(listContactId, idNewsLetter) {
        var deferred = Q.defer();
        var arrayContactId = listContactId.split(",");
        var queryListContact = "";
        for (var i = 0; i < arrayContactId.length; i++) {
            queryListContact += "('" + arrayContactId[i] + "','" + idNewsLetter + "', '0'),";
        }
        queryListContact = queryListContact.slice(0, -1);
        connect.then(function(conn) {
            conn.query("INSERT INTO ListeDiffusion VALUES " + queryListContact)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    }
}
