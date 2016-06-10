var express = require('express');
var mysql = require('promise-mysql');
var Q = require('q');
var connect = mysql.connectToDB();
var nodemailer = require('nodemailer');

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
                    conn.query("INSERT INTO ListeDiffusion (liContactId, liNewsLetterId, liOuvert) VALUES " + queryList)
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
    },

    removeListContactToNewsLetter: function(listContactId, idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("DELETE FROM ListeDiffusion where liNewsLetterId = " + idNewsLetter + " AND liContactId in ("+listContactId+")")
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    sendNewsLetter: function(idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT * FROM NewsLetter WHERE neId = " + idNewsLetter)
                .then(function(newsLetter) {
                  conn.query("SELECT coMail, coId FROM ListeDiffusion, Contact WHERE liNewsLetterId = " + idNewsLetter + " AND liContactId = coId")
                      .then(function(listEmail) {
                          for(var i =0; i < listEmail.length; i++)
                          {

                              console.log(listEmail[i].coId);
                              // create reusable transporter object using the default SMTP transport
                              var transporter = nodemailer.createTransport("SMTP", {
                                                  service: "Gmail",
                                                  auth: {
                                                      user: "doodle.noreply.epsi@gmail.com",
                                                      pass: "qsdfghjklm"
                                                  }
                                              });
                              var srcImg = "http://localhost:4242/newsLetter/mailOpen/"+listEmail[i].coId+"/"+idNewsLetter;
                              console.log(listEmail[i].coId, listEmail[i].coMail);
                              // setup e-mail data with unicode symbols
                              var mailOptions = {
                                  from: '<doodle.noreply.epsi@gmail.com>', // sender address
                                  to: '<'+listEmail[i].coMail+'>', // list of receivers
                                  subject: 'Hello ✔', // Subject line
                                  text: 'Hello world 🐴', // plaintext body
                                  html: '<img src="'+srcImg+'" alt="" />' // html body
                              };

                              // send mail with defined transport object
                              transporter.sendMail(mailOptions, function(error, info){
                                  if(error){
                                      return console.log(error);
                                  }
                                  console.log('Message sent: ' + info.response);
                              });
                          }
                          deferred.resolve();
                      });
                });
        })
        return deferred.promise;
    },

    mailOpen: function(contactId, idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("UPDATE ListeDiffusion SET liOuvert = 1 WHERE liContactId = " + contactId + " AND liNewsLetterId = " + idNewsLetter)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    }
}
