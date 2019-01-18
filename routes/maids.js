var express = require('express');
var router = express.Router();
var firebase = require('../config/db');

var db = firebase.database();

router.get("/maids-log", function (req, res) {
    var ref = db.ref("/maids");
    ref.once("value", function (snapshot) {

        var maidData = [];
        snapshot.forEach(function (element) {
            
            var temp = {
                uid: element.key,
                name: element.val().Name,
                age: element.val().Age,
                contact: element.val().Contact,
                workarea: element.val().Workarea,
                worktype: element.val().Worktype
            }
            maidData.push(temp);
        });
        res.render('maids_log', { maidData: maidData });
    });
});

router.post("/add_maid", function (req, res) {
    var maidname = req.body.maidname;
    var age = req.body.age;
    var contact = req.body.contact;
    var workarea = req.body.workarea;
    var worktype = req.body.worktype;
    var ref = db.ref("/");
    var maidRef = ref.child("maids");
    var maid = maidRef.push({
        Name: maidname,
        Age: age,
        Contact: contact,
        Workarea: workarea,
        Worktype: worktype,
        Currentjobs: [123,431]
    });
    console.log(maid.key);
    res.redirect('/maids-log');
});

router.get('/maids-log/:uid', function (req, res) {
    var uid = req.params.uid;
    var ref = db.ref("/maids");

    ref.once("value", function (snapshot) {

        var found = false;
        var maid;
        snapshot.forEach(function (element) {
            if (element.key == uid) {
                found = true;
                maid = {
                    uid: uid,
                    name: element.val().Name,
                    age: element.val().Age,
                    contact: element.val().Contact,
                    workarea: element.val().Workarea,
                    worktype: element.val().Worktype,
                    currentjobs: element.val().Currentjobs
                }
            }
        });

        if (found) {

            var user_ids = {};
            var uref = db.ref("/users");
            uref.once("value", function (usnapshot) {
                usnapshot.forEach(function (user) {
                    user_ids[user.key] = user.val().Name
                });

                for (var i = 0; i < maid.currentjobs.length; i++) {
                    maid.currentjobs[i] = user_ids[maid.currentjobs[i]];
                }

                res.render("maid_details", { maid: maid });
            });

        } else {
            res.send("Error 404!");
        }
    });
});

router.post('/maids-log/maid', function (req, res) {
    var maidname = req.body.maidname;
    var age = req.body.age;
    var contact = req.body.contact;
    var workarea = req.body.workarea;
    var uid = req.body.uid;
    var worktype = req.body.worktype;
    var currentjobs = req.body.currentjobs;
    db.ref("/maids/" + uid).set({
        Name: maidname,
        Age: age,
        Contact: contact,
        Workarea: workarea,
        Worktype: worktype,
        Currentjobs: currentjobs
    });
    res.redirect('/maids-log');
});

router.post("/maids-log/:uid/delete_maid", function (req, res) {
    var uid = req.params.uid;

    // Delete user record from db
    db.ref('/maids/').child(uid).remove();
    res.redirect('/maids-log');
});


// Name, age, mob, typeofwork:cook,washing,hk,child,elser, workarea


module.exports = router;