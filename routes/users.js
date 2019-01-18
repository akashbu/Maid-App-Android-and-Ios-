var express = require('express');
var router = express.Router();
var firebase = require('../config/db');
var admin = require('firebase-admin');

var db = firebase.database();

router.get('/users-log', function (req, res) {

    var ref = db.ref("/users");
    ref.once("value", function (snapshot) {

        var userData = [];
        snapshot.forEach(function (element) {
            
            var temp = {
                uid: element.key,
                name: element.val().Name,
                contact: element.val().Contact,
                locality: element.val().Locality,
                maids: element.val().Alloted_Maids
            }
            userData.push(temp);
        });

        res.render('users_log', { userData: userData });
    });

});

router.post('/add_user', function (req, res) {
    var username = req.body.username;
    var contact = req.body.contact;
    var locality = req.body.locality;
    var maids = ['-LUGKB9Js95Ypl1nH9yN', '-LUGG2wuUvo25MzsxXhM', '-LUGFkoNqp3sQnE8wXyo'];
    var ref = db.ref("/");
    var userRef = ref.child("users");
    var user = userRef.push({
        Name: username,
        Contact: contact,
        Locality: locality,
        Alloted_Maids: maids
    });
    console.log(user.key);
    res.redirect('/users-log');
});

router.get('/users-log/:uid', function (req, res) {
    var uid = req.params.uid;
    var ref = db.ref("/users");

    ref.once("value", function (snapshot) {

        var found = false;
        var user;
        snapshot.forEach(function (element) {
            if (element.key == uid) {
                found = true;
                user = {
                    uid: uid,
                    name: element.val().Name,
                    contact: element.val().Contact,
                    locality: element.val().Locality,
                    maids: element.val().Alloted_Maids
                }
            }
        });

        if (found) {

            var maid_ids = {};
            var mref = db.ref("/maids");
            mref.once("value", function (msnapshot) {
                msnapshot.forEach(function (maid) {
                    maid_ids[maid.key] = maid.val().Name
                });

                for (var i = 0; i < user.maids.length; i++) {
                    user.maids[i] = maid_ids[user.maids[i]];
                }

                res.render("user_details", { user: user });
            });

        } else {
            res.send("Error 404!");
        }
    });
});

router.post('/users-log/user', function (req, res) {
    var username = req.body.username;
    var contact = req.body.contact;
    var locality = req.body.locality;
    var uid = req.body.uid;
    db.ref("/users/" + uid).set({
        Name: username,
        Contact: contact,
        Locality: locality
    });
    res.redirect('/users-log');
});

router.post("/users-log/:uid/delete_user", function (req, res) {
    var uid = req.params.uid;

    // Delete user from authentication
    admin.auth().deleteUser(uid)
        .then(() => {
            console.log('User Authentication Record Deleted');
            return;
        })
        .catch((err) => console.log(err));

    // Delete user record from db
    db.ref('/users/').child(uid).remove();
    res.redirect('/users-log');
});

module.exports = router;
