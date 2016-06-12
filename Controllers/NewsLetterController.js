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
                conn.query("INSERT INTO Link (linUrl, linOuvert) VALUES ('" + news.UrlLink + "', '0')")
                    .then(function() {
                        conn.query("INSERT INTO NewsLetter (neTitre, neTextContent, neLinkId, neUserId) VALUES ('" + news.neTitre + "', '" + news.neTextContent + "', '" + news.neLinkId + "', '" + news.neUserId + "')")
                            .then(function() {
                                deferred.resolve();
                            });
                    });
            } else {
                conn.query("INSERT INTO NewsLetter (neTitre, neTextContent, neUserId) VALUES ('" + news.neTitre + "', '" + news.neTextContent + "','" + news.neUserId + "')")
                    .then(function() {
                        deferred.resolve();
                    });
            }
        })
        return deferred.promise;
    },

    updateNewsLetter: function(news) {
        var deferred = Q.defer();
        console.log(news);
        connect.then(function(conn) {
            conn.query("UPDATE NewsLetter SET neTitre = '" + news.neTitre + "', neTextContent = '" + news.neTextContent + "' WHERE neId = " + news.neId)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    deleteNewsLetter: function(idNewsLetter){
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("DELETE FROM NewsLetter where neId = " + idNewsLetter)
                .then(function() {
                    deferred.resolve();
                });
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
                              conn.query("UPDATE ListeDiffusion SET liEnvoye = 1 WHERE liContactId = "+ listEmail[i].coId +" AND liNewsLetterId = " + idNewsLetter)
                              console.log(listEmail[i].coId);
                              // create reusable transporter object using the default SMTP transport
                              var transporter = nodemailer.createTransport("SMTP", {
                                                  service: "Gmail",
                                                  auth: {
                                                      user: "doodle.noreply.epsi@gmail.com",
                                                      pass: "qsdfghjklm"
                                                  }
                                              });

                              var srcImg = "http://localhost:4242/newsLetter/mailOpen/"+idNewsLetter+"/"+listEmail[i].coId;
                              var lienDesinscription = "http://localhost:4242/newsLetter/newsDesinscription/"+idNewsLetter+"/"+listEmail[i].coId;
                              var lienNewsLetter = "http://localhost:4242/newsLetter/clickOnLink/"+newsLetter[0].neLinkId;
                              var contentNewsLetter = newsLetter[0].neTextContent;

                              // setup e-mail data with unicode symbols
                              var mailOptions = {
                                  from: '<doodle.noreply.epsi@gmail.com>', // sender address
                                  to: '<'+listEmail[i].coMail+'>', // list of receivers
                                  subject: newsLetter[0].neTitre, // Subject line
                                  html: '<div>'+contentNewsLetter+'</div><img src="'+srcImg+'" alt="" /> </br> <a href="'+lienDesinscription+'">Se désinscrire de la NewsLetter</a> </br> <a href="'+lienNewsLetter+'">Lien de la newsLetter</a>' // html body
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

    mailOpen: function(idNewsLetter, contactId) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("UPDATE ListeDiffusion SET liOuvert = 1 WHERE liContactId = " + contactId + " AND liNewsLetterId = " + idNewsLetter)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    newsDesinscription: function(idNewsLetter, contactId) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("DELETE FROM ListeDiffusion WHERE liContactId = " + contactId + " AND liNewsLetterId = " + idNewsLetter)
                .then(function() {
                    deferred.resolve();
                });
        })
        return deferred.promise;
    },

    clickOnLink: function(idLink) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("UPDATE Link SET linOuvert = linOuvert + 1 WHERE linId = " + idLink)
                .then(function() {
                  conn.query("SELECT linUrl FROM Link WHERE linId = " + idLink)
                      .then(function(url) {
                        console.log(url[0].linUrl);
                          deferred.resolve(url[0].linUrl);
                      });
                });
        })
        return deferred.promise;
    },

    getNombreMailOuvert: function(idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT COUNT(*) AS nbMailOuvert FROM ListeDiffusion WHERE liOuvert = 1 AND liNewsLetterId = " + idNewsLetter)
                .then(function(nbMailOuvert) {
                  deferred.resolve(nbMailOuvert[0].nbMailOuvert);
                });
        })
        return deferred.promise;
    },

    getStatLienClique: function(idNewsLetter) {
        var deferred = Q.defer();
        connect.then(function(conn) {
            conn.query("SELECT linOuvert FROM Link, NewsLetter WHERE neLinkId = linId AND neId = " + idNewsLetter)
                .then(function(nbLinkOpen) {
                  deferred.resolve(nbLinkOpen[0].linOuvert);
                });
        })
        return deferred.promise;
    }
}
